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
                @click="handleToggleChat"
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
                            msg.userName === currentUser.username
                                ? 'message-right'
                                : 'message-left',
                            msg.admin && msg.userName !== currentUser.username
                                ? 'admin-message-wrapper'
                                : '',
                        ]"
                    >
                        <div class="message-container">
                            <div
                                v-if="msg.userName !== currentUser.username"
                                class="d-flex align-center mb-1"
                            >
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
                                :class="
                                    msg.userName === currentUser.username
                                        ? 'justify-end'
                                        : 'justify-start'
                                "
                            >
                                <v-card
                                    class="message-bubble pa-2"
                                    :class="[
                                        msg.userName === currentUser.username
                                            ? 'current-user-message'
                                            : 'other-user-message',
                                        msg.admin && msg.userName === currentUser.username
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
                                    msg.userName === currentUser.username
                                        ? 'text-right'
                                        : 'text-left',
                                ]"
                            >
                                <div class="d-flex justify-end">
                                    {{ formatMessageSendDate(msg.time) }}
                                    <div v-if="msg.userName === currentUser.username && msg.admin">
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
import { state, joinCourse, sendMessage as emitMessage, leaveCourse } from "@/socket";
import { useIndexStore } from "@/stores/index.store";
import { useAuthStore } from "@/modules/auth/auth.store";
import { formatRelative } from "date-fns";
import { pt } from "date-fns/locale";
import { computed, ref, nextTick, watch, onBeforeUnmount } from "vue";

const indexStore = useIndexStore();
const authStore = useAuthStore();

const isChatOpen = ref(false);
const isLoadingOpenChat = ref(false);
const messageInput = ref("");
const messagesContainer = ref<HTMLElement | null>(null);
const isUserScrolling = ref(false);

const currentUser = computed(() => authStore.user);
const isAdmin = computed(() => currentUser.value.role === "ADMIN");
const messages = computed(() => state.value.messages);
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

const handleToggleChat = () => {
    if (!isChatOpen.value) {
        openChat();
    } else {
        closeChat();
    }
};

const openChat = async () => {
    try {
        isLoadingOpenChat.value = true;

        await joinCourse({
            courseId: "1",
            userName: currentUser.value.username,
        });

        isChatOpen.value = true;

        await nextTick();
        scrollToBottom(false);
    } catch (error) {
        console.error("Error opening chat:", error);
    } finally {
        isLoadingOpenChat.value = false;
    }
};

const closeChat = () => {
    try {
        leaveCourse({
            courseId: "1",
            userName: currentUser.value.username,
        });

        isChatOpen.value = false;
    } catch (error) {
        console.error("Error closing chat:", error);
    }
};

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
        try {
            await emitMessage({
                message: messageInput.value,
                courseId: "1",
                userName: currentUser.value.username,
                userId: currentUser.value.sub?.toString() || "",
                admin: isAdmin.value,
            });

            messageInput.value = "";
            await nextTick();
            scrollToBottom(true);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
};

watch(
    () => state.value.error,
    (error) => {
        if (error) {
            console.error("Socket error:", error);
        }
    },
);

onBeforeUnmount(() => {
    if (isChatOpen.value) {
        closeChat();
    }
});
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
