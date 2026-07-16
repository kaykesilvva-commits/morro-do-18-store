export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            erro: "Método não permitido"
        });
    }

    const {
        nome,
        numero,
        frase,
        extra,
        total
    } = req.body;

    console.log({
        nome,
        numero,
        frase,
        extra,
        total
    });

    return res.status(200).json({
        sucesso: true,
        mensagem: "API funcionando!"
    });

}