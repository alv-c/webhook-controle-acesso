import { saveMsg, sendMsg } from "./messageControllers.js";
import { returnDecryptedLink } from "../utils/returnDecryptedLink.js";

export const main = async (data: any) => {
    const dataMessage: any = data?.Body?.Text;
    if (data?.Type === 'receveid_message' && dataMessage) {
        const dataArrayControlAcesso = dataMessage.split(':');
        if (dataArrayControlAcesso[0] === '*CA*') {
            dataArrayControlAcesso.splice(0, 1);
            let decryptedJson = JSON.parse(returnDecryptedLink(dataArrayControlAcesso[0]));
            let msg = '';
            try {
                let retornoSave = await saveMsg({
                    nome: data?.Body?.Info?.PushName,
                    whatsapp: data?.Body?.Info?.SenderJid.match(/^(\d+)@/)[1],
                    server: decryptedJson.server,
                    cs_id: decryptedJson.cs_id,
                    particao: decryptedJson.particao,
                });
                if (retornoSave) msg = `Solicitação emitida com sucesso!`;
                else msg = `Esta conta já *possui uma solicitação C.A com o status 'pendente'*. Por favor, *aguarde ou ligue em caso de emergência 0800-062-1800*`;
                await sendMsg(data, msg);
            } catch (error) {
                msg = `Erro ao tentar emitir *C.A*. Por favor, tente novamente em alguns instantes!`;
                await sendMsg(data, msg);
                console.error("Erro ao salvar a mensagem:", error);
            }
        }
    }
}