<template>
    <v-container fluid class="full-height-container">
        <v-card class="register-card" color="secondary">

            <div class="label-style" color="secondary">Título</div>

            <v-text-field v-model="titleMaterial" required density="compact" placeholder="Informe o título do material"
                variant="outlined"></v-text-field>

            <v-textarea v-model="descriptionMaterial" clearable row-height="25" rows="3" variant="outlined"
                label="Descrição do material:"></v-textarea>

            <v-container class="file-upload-container">
                <v-row justify="center" align="center" class="fill-height">
                    <v-col cols="12" class="text-center">
                        <v-icon x-large color="success">mdi-cloud-upload</v-icon>
                        <p class="mt-4">Arraste e solte um arquivo aqui</p>
                        <p>ou</p>
                        <label for="file-input" class="custom-upload-btn">
                            carregar arquivo
                        </label>
                        <input id="file-input" ref="fileInputRef" type="file"
                            accept=".pdf,audio/,image/,.txt,.csv,.ppt,.pptx,.js,.ts,.java,.py,.html,.css,.json,.xml,.c,.cpp,.php"
                            hidden @change="handleFileUpload" />
                        <p v-if="arquiveName" class="file-name">{{ arquiveName }}</p>
                        <v-btn v-if="arquiveName" color="red" size="small" @click="deleteFile()">deletar</v-btn>
                    </v-col>
                </v-row>
            </v-container>

            <v-btn class="mt-4 mb-2" color="secondary" size="default" block @click="enviarMaterial">
                Adicionar material
            </v-btn>
        </v-card>
    </v-container>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { pushMessageNotification } from "@/utils/notivue-base";
pushMessageNotification;

const typesOfMaterial = ['PDF', 'AUDIO', 'IMAGE', 'TEXT', 'SLIDES', 'LINK', 'CODE']


const fileInputRef = ref<HTMLInputElement | null>(null)
const arquiveName = ref('')
const titleMaterial = ref('')
const descriptionMaterial = ref('')


const handleFileUpload = () => {
    const file = fileInputRef.value?.files?.[0]
    if (file) {
        arquiveName.value = file.name
    }
}

const deleteFile = () => {
    arquiveName.value = ''
    if (fileInputRef.value) {
        fileInputRef.value.value = ''
    }

}

const enviarMaterial = () => {

    const file = fileInputRef.value?.files?.[0]

    const validations = [
        { field: titleMaterial.value, message: "Informe o título." },
        { field: descriptionMaterial.value, message: "Informe a descrição." },
        { field: file, message: "Selecione um arquivo." }
    ];

    for (const validation of validations) {
        if (!validation.field) {
            pushMessageNotification({
                type: "error",
                title: "Erro!",
                message: validation.message,
                duration: 3000,
            });
            return;
        }
    }


    try {

        if (fileInputRef) {
            console.log("titulo: ", titleMaterial.value)
            console.log("descrição: ", descriptionMaterial.value)
            console.log("arquivo: ", fileInputRef.value.value)
            pushMessageNotification({
                type: "success",
                title: "Sucesso!",
                message: "Arquivo enviado",
                duration: 3000,
            });
        }
        titleMaterial.value = '';
        descriptionMaterial.value = '';
        if (fileInputRef.value) {
            fileInputRef.value.value = '';
        }



    } catch {

    }

}

</script>

<style scoped>
.full-height-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 64px);
    padding: 0;
    margin: 0;
}

.register-card {
    width: 100%;
    max-width: 500px;
    padding: 2rem;
    box-shadow: 8;
    overflow-y: auto;
}

.label-style {
    font-weight: bold;
}

.file-upload-container {
    background-color: #FFFFFF;
    min-height: 200px;
    border: 2px dashed #616161;
    border-radius: 4px;
    color: #616161;
}

.custom-upload-btn {
    display: inline-block;
    background-color: #461CDC;
    /* Cor roxa Vuetify */
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;
    user-select: none;
    text-transform: uppercase;
}

.custom-upload-btn:hover {
    background-color: #4839DB;
    /* Tom mais escuro ao passar o mouse */

}

.file-name {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>