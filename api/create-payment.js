import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido",
    });
  }

  const { nome, total } = req.body;

  try {

    const payment = new Payment(client);

    const resultado = await payment.create({
      body: {
        transaction_amount: Number(total),
        description: "Compra Morro do 18 Store",
        payment_method_id: "pix",
        payer: {
          email: "reimidia7@gmail.com",
          first_name: nome || "Cliente",
        }
      }
    });

    return res.status(200).json({
      id: resultado.id,
      qr_code: resultado.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        resultado.point_of_interaction.transaction_data.qr_code_base64
    });

  } catch (erro) {

    console.log("ERRO COMPLETO:");
    console.log(JSON.stringify(erro, null, 2));

    return res.status(500).json({
        erro: erro.message,
        detalhes: erro
    });

}

  }

}