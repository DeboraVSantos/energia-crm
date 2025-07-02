import { useState } from "react";

export default function EnergiaCRM() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nome: "", nif: "", telefone: "", vendedor: "", documentos: [], feedback: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setForm({ ...form, documentos: files });
  }

  function adicionarCliente() {
    if (!form.nome || !form.nif || !form.telefone || !form.vendedor) return;
    setClientes([...clientes, { ...form }]);
    setForm({ nome: "", nif: "", telefone: "", vendedor: "", documentos: [], feedback: "" });
  }

  function gerarLinkChamada(numero) {
    const tel = numero.replace(/[^0-9]/g, "");
    return `https://wa.me/${tel}`;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>Energia CRM - Cadastro de Clientes</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Nome do Cliente</label><br />
        <input name="nome" value={form.nome} onChange={handleChange} /><br />
        <label>NIF</label><br />
        <input name="nif" value={form.nif} onChange={handleChange} /><br />
        <label>Telefone</label><br />
        <input name="telefone" value={form.telefone} onChange={handleChange} /><br />
        <label>Nome ou Código do Vendedor</label><br />
        <input name="vendedor" value={form.vendedor} onChange={handleChange} /><br />
        <label>Documentos</label><br />
        <input type="file" multiple onChange={handleFileChange} /><br />
        <label>Feedback (opcional)</label><br />
        <textarea name="feedback" value={form.feedback} onChange={handleChange}></textarea><br /><br />
        <button onClick={adicionarCliente}>Salvar Cliente</button>
      </div>

      {clientes.map((cliente, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>NIF:</strong> {cliente.nif}</p>
          <p><strong>Telefone:</strong> {cliente.telefone}</p>
          <p><strong>Vendedor:</strong> {cliente.vendedor}</p>
          <p><strong>Feedback:</strong> {cliente.feedback || "Nenhum"}</p>
          <p><strong>Chamada:</strong> <a href={gerarLinkChamada(cliente.telefone)} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a></p>
          <div>
            <strong>Documentos:</strong>
            <ul>
              {cliente.documentos.map((doc, i) => (
                <li key={i}>{doc.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}