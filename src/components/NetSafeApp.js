
import React, { useState } from "react";

export default function NetSafeApp({ email }) {
  const [link, setLink] = useState("");
  const [descricao, setDescricao] = useState("");
  const [resposta, setResposta] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const analise = await simularIA(link, descricao);
    setResposta(analise);
    setLoading(false);
  };

  const simularIA = async (link, descricao) => {
    await new Promise((r) => setTimeout(r, 2000)); // delay fake
    const palavrasChave = ["ódio", "racismo", "ameaça", "ofensa", "discriminação"];
    const detectado = palavrasChave.some((palavra) => descricao.toLowerCase().includes(palavra));
    return {
      status: detectado ? "Conteúdo ilícito detectado" : "Nenhuma violação clara identificada",
      tipoViolacao: detectado ? "Possível discurso de ódio ou ofensa grave" : "Não identificado",
      recomendacao: detectado
        ? "Recomenda-se enviar notificação extrajudicial"
        : "Revisar manualmente ou consultar suporte jurídico",
      documento: `Usuário: ${email}\nLink analisado: ${link}\nDescrição: ${descricao}`
    };
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">Nova Denúncia</h2>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Link do conteúdo"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Descreva o conteúdo"
        rows="4"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Analisar
      </button>

      {loading && <p className="text-sm text-gray-500 mt-2">Analisando conteúdo...</p>}

      {resposta && (
        <div className="mt-4 p-3 bg-gray-100 border rounded">
          <p><strong>Status:</strong> {resposta.status}</p>
          <p><strong>Tipo:</strong> {resposta.tipoViolacao}</p>
          <p><strong>Recomendação:</strong> {resposta.recomendacao}</p>
          <pre className="mt-2 text-sm whitespace-pre-wrap">{resposta.documento}</pre>
        </div>
      )}
    </div>
  );
}
