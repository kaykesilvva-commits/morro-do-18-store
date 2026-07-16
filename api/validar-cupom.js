import supabase from "../lib/supabase.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      erro: "Método não permitido"
    });
  }

  const { codigo } = req.body;

  const { data, error } = await supabase
    .from("cupons")
    .select("*")
    .eq("codigo", codigo)
    .eq("ativo", true)
    .single();

  if (error || !data) {
    return res.status(404).json({
      valido: false
    });
  }

  return res.status(200).json({
    valido: true,
    desconto: data.desconto
  });

}