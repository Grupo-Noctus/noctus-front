import { certificateHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";

export const CertificateService = () => {
    const getCertificateService = async (enrollmentId: number) => {
        try {
            const data = await certificateHttp.uploadCertificateHttp(enrollmentId);
            return data;
        } catch (error) {
            pushMessageNotification({
                type: "error",
                title: "Erro!",
                message: "Erro ao gerar o certificado!",
                duration: 3000,
            });
            console.error(error);
            return null;
        }
    };

    return {
        getCertificateService,
    };
};
