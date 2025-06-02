<template>
    <v-card
        :class="['chat-container-base', chatCollapsedBorder, chatContainerClass]"
        :loading="isLoadingOpenChat"
        elevation="0"
    >
        <v-card
            class="chat-header-container rounded-0"
            elevation="0"
            variant="elevated"
            :color="chatHeaderCollapsedStyle"
        >
            <v-btn
                density="compact"
                size="default"
                variant="text"
                :color="chatHeaderColor"
                icon="mdi-chat-outline"
                class="font-weight-bold ml-2"
            >
            </v-btn>

            <v-card
                class="text-body-1 text-uppercase font-weight-bold"
                :color="chatHeaderColor"
                variant="text"
                >chat</v-card
            >

            <v-btn
                density="compact"
                size="default"
                variant="text"
                icon="mdi-unfold-more-horizontal"
                :loading="isLoadingOpenChat"
                @click="openChat"
            ></v-btn>
        </v-card>

        <div v-if="isChatOpen" class="chat-content">
            <div
                ref="messagesContainer"
                class="messages-container flex-grow-1"
                @scroll="handleScroll"
            >
                <div class="pa-3">
                    <div
                        v-for="msg in messages"
                        :key="msg.id"
                        :class="[
                            'message-wrapper',
                            msg.id === currentUserId ? 'message-right' : 'message-left',
                            msg.admin && msg.id !== currentUserId ? 'admin-message-wrapper' : '',
                        ]"
                    >
                        <div class="message-container">
                            <div v-if="msg.id !== currentUserId" class="d-flex align-center mb-1">
                                <v-icon
                                    :icon="msg.admin ? 'mdi-crown' : 'mdi-account'"
                                    size="10"
                                    :color="msg.admin ? '#6BFF50' : 'grey'"
                                    class="mx-1"
                                >
                                </v-icon>
                                <div class="d-flex align-center">
                                    <span class="user-name-message">
                                        {{ msg.userName }}
                                    </span>
                                </div>
                            </div>

                            <div
                                class="d-flex align-end"
                                :class="msg.id === currentUserId ? 'justify-end' : 'justify-start'"
                            >
                                <v-card
                                    class="message-bubble pa-2"
                                    :class="[
                                        msg.id === currentUserId
                                            ? 'current-user-message'
                                            : 'other-user-message',
                                        msg.admin && msg.id === currentUserId
                                            ? 'admin-message'
                                            : '',
                                    ]"
                                    variant="flat"
                                    elevation="2"
                                >
                                    <p class="text-body-2 mb-0">
                                        {{ msg.message }}
                                    </p>
                                </v-card>
                            </div>

                            <div
                                :class="[
                                    'text-caption text-grey mt-1',
                                    msg.id === currentUserId ? 'text-right' : 'text-left',
                                ]"
                            >
                                <div class="d-flex justify-end">
                                    {{ formatMessageSendDate(msg.time) }}
                                    <div v-if="msg.id === currentUserId && msg.admin">
                                        <v-icon
                                            icon="mdi-crown"
                                            size="10"
                                            color="#6BFF50"
                                            class="ms-2"
                                        >
                                        </v-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <v-card class="d-flex align-end pa-2 rounded-0" variant="tonal">
                <v-textarea
                    v-model="messageInput"
                    auto-grow
                    max-rows="3"
                    class="flex-grow-1 mr-2 pt-0"
                    hide-details
                    variant="plain"
                    :single-line="false"
                    label="digite sua mensagem"
                    density="compact"
                    flat
                    rows="1"
                    @keyup.enter="sendMessage"
                />
                <v-btn
                    size="small"
                    icon="mdi-send"
                    density="comfortable"
                    color="primary"
                    :disabled="!messageInput.trim()"
                    @click="sendMessage"
                >
                </v-btn>
            </v-card>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/index.store";
import { formatRelative } from "date-fns";
import { pt } from "date-fns/locale";
import { computed, ref, nextTick, watch } from "vue";

const indexStore = useIndexStore();

const isChatOpen = ref(false);
const isLoadingOpenChat = ref(false);
const messageInput = ref("");
const currentUserId = ref(1);
const messagesContainer = ref<HTMLElement | null>(null);
const isUserScrolling = ref(false);

const isDarkTheme = computed(() => indexStore.isDark);

const chatHeaderColor = computed(() => {
    if (!isChatOpen.value) {
        return isDarkTheme.value ? "#6BFF50" : "primary";
    } else {
        return "#6BFF50";
    }
});

const chatHeaderCollapsedStyle = computed(() => {
    return isChatOpen.value ? "primary" : "";
});

const chatCollapsedBorder = computed(() => {
    return !isChatOpen.value ? "border-t border-s" : "rounded-0";
});

const chatContainerClass = computed(() => {
    return isChatOpen.value ? "chat-container-open" : "chat-container-collapsed";
});

const openChat = async () => {
    isLoadingOpenChat.value = true;
    await new Promise((resolve) => setTimeout(resolve, 300));
    isChatOpen.value = !isChatOpen.value;
    isLoadingOpenChat.value = false;

    if (isChatOpen.value) {
        await nextTick();
        scrollToBottom(false);
    }
};

const messages = ref([
    {
        id: 1,
        message: "Pessoal, alguém conseguiu resolver o exercício 3?",
        time: "2025-05-22T13:45:00Z",
        userName: "joaosilva",
        admin: false,
    },
    {
        id: 2,
        message: "Me ajude admin",
        time: "2025-05-22T14:45:00Z",
        userName: "messinaldo",
        admin: false,
    },
    {
        id: 3,
        message: "Sim! Tive que usar recursão. Vocês tentaram essa abordagem?",
        time: "2025-05-22T13:47:00Z",
        userName: "mariasantos",
        admin: false,
    },
    {
        id: 4,
        message: "Ainda estou travado na parte da validação. Alguém pode dar uma dica?",
        time: "2025-05-22T23:15:00Z",
        userName: "icaro",
        admin: false,
    },
    {
        id: 5,
        message: "⚠️ ATENÇÃO: Lembrem-se de que o prazo para entrega do projeto é amanhã às 23:59!",
        time: "2025-05-22T23:39:00Z",
        userName: "Prof. Ricardo",
        admin: true,
    },
    {
        id: 6,
        message: "Obrigado pelo lembrete, professor!",
        time: "2025-05-22T23:39:00Z",
        userName: "icaro",
        admin: true,
    },
    {
        id: 1,
        message:
            "Para quem está com dúvidas, estarei disponível no horário de atendimento das 14h às 16h.",
        time: "2025-05-22T23:40:00Z",
        userName: "Prof. Ricardo",
        admin: true,
    },
    {
        id: 8,
        message: "Também estou interessada no código do Pedro. Pode compartilhar no grupo?",
        time: "2025-05-22T23:41:00Z",
        userName: "anacosta",
        admin: false,
    },
]);

const scrollToBottom = (smooth = false) => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTo({
            top: messagesContainer.value.scrollHeight,
            behavior: smooth ? "smooth" : "auto",
        });
    }
};

const isAtBottom = () => {
    if (!messagesContainer.value) return false;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
    return scrollTop + clientHeight >= scrollHeight - 10;
};

// Função para lidar com o scroll manual do usuário
const handleScroll = () => {
    if (!messagesContainer.value) return;

    isUserScrolling.value = true;

    setTimeout(() => {
        isUserScrolling.value = false;
    }, 100);
};

watch(
    messages,
    async () => {
        await nextTick();

        if (!isUserScrolling.value && isAtBottom()) {
            scrollToBottom(false);
        }
    },
    { deep: true },
);

const formatMessageSendDate = (dateMessage: string) => {
    const result = formatRelative(dateMessage, new Date(), {
        locale: pt,
    });
    return result;
};

const sendMessage = async () => {
    if (messageInput.value.trim()) {
        const newMessage = {
            id: 1,
            message: messageInput.value,
            time: new Date().toISOString(),
            userName: "icaro",
            admin: true,
        };

        messages.value.push(newMessage);
        messageInput.value = "";

        await nextTick();
        scrollToBottom(false);
    }
};
</script>

<style scoped>
.chat-container-base {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 2;
    transition: all 0.3s ease-in-out;
}

.chat-container-collapsed {
    width: 25%;
    min-width: 200px;
    max-width: 340px;
    height: 50px;
    border-radius: 10px 0px 0px 0px;
}

.chat-container-open {
    width: 25%;
    height: 60%;
}

.chat-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
}

.chat-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    opacity: 0;
    animation: fadeIn 0.3s ease-in-out 0.1s forwards;
    height: calc(100% - 52px);
}

.user-name-message {
    font-size: 0.75rem;
    font-weight: 500;
    color: #727272;
}

.messages-container {
    overflow-y: auto;
    max-height: calc(100% - 48px);
}

.message-wrapper {
    margin-bottom: 20px;
    display: flex;
}

.message-left {
    justify-content: flex-start;
}

.message-right {
    justify-content: flex-end;
}

.message-container {
    max-width: 70%;
    min-width: 120px;
}

.message-bubble {
    border-radius: 16px;
    position: relative;
    max-width: 100%;
    word-wrap: break-word;
}

.current-user-message {
    background-color: #461cdc;
    color: white;
}

.other-user-message {
    background-color: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.chat-header-color-dark {
    background-color: #1a1a1a;
    color: white;
}

.chat-header-color-light {
    background-color: #f5f5f5;
    color: black;
}

.admin-message-wrapper {
    position: relative;
}

.admin-message-wrapper::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #6bff50;
    border-radius: 2px;
}

.admin-message {
    border: 1px solid #6bff50 !important;
    position: relative;
}

.theme--dark .other-user-message {
    background-color: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(172, 40, 40, 0.12);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .chat-container-collapsed,
    .chat-container-open {
        max-width: 100%;
        width: 100%;
    }

    .chat-container-open {
        height: 60vh;
    }

    .message-container {
        max-width: 85%;
    }
}

.messages-container::-webkit-scrollbar {
    width: 7px;
}

.messages-container::-webkit-scrollbar-track {
    background: transparent;
}

.messages-container::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}
</style>
