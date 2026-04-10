import React, { useState, useEffect } from "react";

export default function App() {
  // Carrega o CSS e os ícones silenciosamente pelo navegador
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const tailwind = document.createElement("script");
      tailwind.id = "tailwind-cdn";
      tailwind.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(tailwind);
    }
    if (!document.getElementById("phosphor-cdn")) {
      const phosphor = document.createElement("script");
      phosphor.id = "phosphor-cdn";
      phosphor.src = "https://unpkg.com/@phosphor-icons/web";
      document.head.appendChild(phosphor);
    }
  }, []);

  // =====================================================================
  // CHAVE DO WEB3FORMS
  // =====================================================================
  const WEB3FORMS_ACCESS_KEY = "0aac5767-8581-4116-82c6-e3920d7393cb"; 
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [lang, setLang] = useState("pt");

  const logoUrl = "https://drive.google.com/uc?export=view&id=1P7fhoER3300U2DjueP20EeoairS4P4p0";

  const [formData, setFormData] = useState({
    nome: "", empresa: "", prefContato: "email", email: "", whatsapp: "",
    operacao: "exportacao", origem: "", destino: "", fronteira: "", veiculo: "sider",
    peso: "", volume: "", embalagem: "pallet", incoterm: "FCA", fileName: "",
    descricao: "", urgencia: "3"
  });

  const t = {
    pt: {
      title: "Solicitação de Cotação", step1: "1. Dados de Contato", step2: "2. Rota e Veículo", step3: "3. Carga e Documentos",
      stepXofY: `Passo ${step} de 3`, intro1: "Para iniciarmos seu atendimento personalizado, com quem estamos falando?",
      name: "Seu Nome *", company: "Empresa", contactPref: "Como prefere receber o retorno?",
      email: "E-mail", whatsapp: "WhatsApp", emailLabel: "Endereço de E-mail *", whatsappLabel: "Número do WhatsApp *",
      opType: "Tipo de Operação *", export: "Exportação", import: "Importação",
      originBr: "Origem (Brasil) *", originExt: "Origem (Exterior) *", destExt: "Destino (Exterior) *", destBr: "Destino (Brasil) *",
      border: "Fronteira Desejada (Desembaraço) *", vehicle: "Tipo de Veículo (FTL)",
      grossWeight: "Peso Bruto (kg)", volume: "Volume (CBM)", packaging: "Embalagem",
      urgencyLabel: "Qual a urgência dessa cotação?", urgencyMin: "Pesquisa", urgencyMax: "Urgente",
      docsInfo: "Documentos da Carga (Invoice/Packing List)",
      docsSubInfo: "Para garantir a segurança dos seus dados, solicitaremos os anexos diretamente por e-mail logo após a recepção desta cotação.",
      obs: "Observações adicionais (NCM, necessidades especiais...)",
      btnBack: "Voltar", btnNext: "Próximo", btnSubmit: "Finalizar e Enviar", btnSending: "Enviando Dados...",
      successTitle: "Cotação Enviada com Sucesso!", successSub: "Nossa equipe já recebeu seus dados e o relatório foi gerado. Retornaremos em breve.",
      summary: "Resumo do que foi enviado", client: "Cliente", route: "Rota / Fronteira", via: "Via", status: "Status", btnConfirm: "Fazer Nova Cotação",
      phName: "Ex: João Silva", phCompany: "Ex: Minha Empresa Ltda", phOrigExp: "Ex: São Paulo, SP", phOrigImp: "Ex: Buenos Aires, AR",
      phDestExp: "Ex: Santiago, CL", phDestImp: "Ex: Curitiba, PR", phBorder: "Ex: Uruguaiana/RS, Paso de los Libres...",
      phPeso: "Ex: 12000", phVol: "Ex: 45 m³",
      hero1: "Cotação FTL rápida e sem burocracia.", hero2: "Especialistas em rotas rodoviárias no Mercosul.",
      hero3: "Sua documentação agiliza nosso processo.", hero4: "Tudo certo! Recebemos sua Cotação.",
      heroSub: "Veículos dedicados, segurança e inteligência aduaneira de ponta a ponta.",
    },
    es: {
      title: "Solicitud de Cotización", step1: "1. Datos de Contacto", step2: "2. Ruta y Vehículo", step3: "3. Carga y Documentos",
      stepXofY: `Paso ${step} de 3`, intro1: "Para comenzar con su atención personalizada, ¿con quién hablamos?",
      name: "Su Nombre *", company: "Empresa", contactPref: "¿Cómo prefiere ser contactado?",
      email: "Correo", whatsapp: "WhatsApp", emailLabel: "Correo Electrónico *", whatsappLabel: "Número de WhatsApp *",
      opType: "Tipo de Operación *", export: "Exportación (Desde BR)", import: "Importación (Hacia BR)",
      originBr: "Origen (Brasil) *", originExt: "Origen (Exterior) *", destExt: "Destino (Exterior) *", destBr: "Destino (Brasil) *",
      border: "Frontera de Cruce (Aduana) *", vehicle: "Tipo de Vehículo (FTL)",
      grossWeight: "Peso Bruto (kg)", volume: "Volumen (CBM)", packaging: "Embalaje",
      urgencyLabel: "¿Cuál es la urgencia de esta cotización?", urgencyMin: "Consulta", urgencyMax: "Urgente",
      docsInfo: "Documentos de la Carga (Factura/Packing List)",
      docsSubInfo: "Para garantizar la seguridad de sus datos, solicitaremos los archivos adjuntos directamente por correo electrónico tras recibir esta cotización.",
      obs: "Observaciones adicionales (NCM, necesidades especiales...)",
      btnBack: "Volver", btnNext: "Siguiente", btnSubmit: "Finalizar y Enviar", btnSending: "Enviando Datos...",
      successTitle: "¡Cotización Enviada con Éxito!", successSub: "Nuestro equipo ya recibió sus datos. Nos pondremos en contacto a la brevedad.",
      summary: "Resumen de lo enviado", client: "Cliente", route: "Ruta / Frontera", via: "Por", status: "Estado", btnConfirm: "Hacer Nueva Cotización",
      phName: "Ej: Juan Pérez", phCompany: "Ej: Mi Empresa S.A.", phOrigExp: "Ej: São Paulo, SP (Brasil)", phOrigImp: "Ej: Buenos Aires, AR",
      phDestExp: "Ej: Santiago, CL", phDestImp: "Ej: Curitiba, PR (Brasil)", phBorder: "Ej: Paso de los Libres, Uruguaiana...",
      phPeso: "Ej: 12000", phVol: "Ej: 45 m³",
      hero1: "Cotización FTL rápida y sin burocracia.", hero2: "Especialistas en rutas terrestres en el Mercosur.",
      hero3: "Su documentación agiliza nuestro proceso.", hero4: "¡Todo listo! Hemos recibido su Cotización.",
      heroSub: "Vehículos exclusivos, seguridad e inteligencia aduanera de punta a punta.",
    }
  };

  const currentT = t[lang];

  const urgenciaLabels = {
    pt: { 1: "🧊 Apenas pesquisa de mercado", 2: "📅 Planejamento (Próximas semanas)", 3: "🚚 Pronto para embarcar (Dias)", 4: "🔥 Embarque Urgente (Imediato)" },
    es: { 1: "🧊 Solo consulta de mercado", 2: "📅 Planificación (Próximas semanas)", 3: "🚚 Listo para embarcar (Días)", 4: "🔥 Embarque Urgente (Inmediato)" }
  };

  const veiculos = {
    sider: { pt: "Sider", es: "Sider" }, bau: { pt: "Baú", es: "Furgón" },
    refrigerado: { pt: "Refrigerado", es: "Refrigerado" }, aberto: { pt: "Aberto/Graneleiro", es: "Abierto/Granelero" }
  };

  const embalagens = [
    { id: "pallet", pt: "Pallet", es: "Pallet" }, { id: "caixa", pt: "Caixa", es: "Caja" },
    { id: "tambor", pt: "Tambor", es: "Tambor" }, { id: "bigbag", pt: "Big Bag", es: "Big Bag" },
    { id: "bolsas_sacos", pt: "Bolsas/Sacos", es: "Bolsas/Sacos" }, { id: "outros", pt: "Outros...", es: "Otros..." }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nome || (formData.prefContato === "email" && !formData.email) || (formData.prefContato === "whatsapp" && !formData.whatsapp)) {
        alert(lang === "pt" ? "Por favor, preencha os campos obrigatórios." : "Por favor, complete los campos obligatorios.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.origem || !formData.destino || !formData.fronteira) {
        alert(lang === "pt" ? "Por favor, preencha origem, destino e fronteira." : "Por favor, complete origen, destino y frontera.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const resetForm = () => {
    setStep(1);
    setFormData({
      nome: "", empresa: "", prefContato: "email", email: "", whatsapp: "",
      operacao: "exportacao", origem: "", destino: "", fronteira: "", veiculo: "sider",
      peso: "", volume: "", embalagem: "pallet", incoterm: "FCA", fileName: "",
      descricao: "", urgencia: "3"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = new FormData();
    const embPT = embalagens.find(e => e.id === formData.embalagem)?.pt || formData.embalagem;
    
    // Configurações do Web3Forms
    submissionData.append("access_key", WEB3FORMS_ACCESS_KEY);
    submissionData.append("subject", `Nova Cotação FTL - ${formData.empresa || formData.nome}`);
    submissionData.append("from_name", "Portal Trans Fábula");
    
    // Removido os acentos dos títulos para evitar bugs no PDF do Web3Forms
    submissionData.append("1. Operacao", formData.operacao.toUpperCase());
    submissionData.append("2. Cliente", formData.nome);
    submissionData.append("3. Empresa", formData.empresa || "Não informada");
    submissionData.append("4. Contato Preferencial", formData.prefContato);
    submissionData.append("5. Email", formData.email);
    submissionData.append("6. WhatsApp", formData.whatsapp);
    submissionData.append("7. Origem", formData.origem);
    submissionData.append("8. Destino", formData.destino);
    submissionData.append("9. Fronteira", formData.fronteira);
    submissionData.append("10. Veiculo", veiculos[formData.veiculo].pt.toUpperCase());
    submissionData.append("11. Peso", formData.peso ? `${formData.peso} kg` : "Não informado");
    submissionData.append("12. Volume", formData.volume || "Não informado");
    submissionData.append("13. Embalagem", embPT);
    submissionData.append("14. Incoterm", formData.incoterm);
    submissionData.append("15. Urgencia", urgenciaLabels.pt[formData.urgencia]);
    submissionData.append("16. Observacoes", formData.descricao || "Nenhuma");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: submissionData
      });

      const result = await response.json();

      if (response.ok) {
        setStep(4);
      } else {
        alert(lang === "pt" ? `Erro do Servidor: ${result.message}` : `Error del Servidor: ${result.message}`);
      }
    } catch (error) {
      alert(lang === "pt" ? "Erro de conexão com o servidor. Tente novamente." : "Error de conexión.");
    }

    setIsSubmitting(false);
  };

  const getStepImage = () => {
    switch (step) {
      case 1: return "https://drive.google.com/uc?export=view&id=10eZ0XL2Z5hxUDZMPaNHY_oBLjMeKty9P";
      case 2: return "https://drive.google.com/uc?export=view&id=10eZ0XL2Z5hxUDZMPaNHY_oBLjMeKty9P";
      case 3: return "https://drive.google.com/uc?export=view&id=1rqeNL2Z48oq9hUU68V_h8ECWHIi3Lt21";
      case 4: return "https://drive.google.com/uc?export=view&id=10eZ0XL2Z5hxUDZMPaNHY_oBLjMeKty9P";
      default: return "https://drive.google.com/uc?export=view&id=1DM4W3JcFnqYbDhiZLLVWm0vCSZi40Tw-";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-[720px] transition-all duration-500 ease-in-out">
        
        {/* Painel Esquerdo */}
        <div className="hidden md:block md:w-5/12 relative overflow-hidden bg-blue-900">
          <div className="absolute inset-0 bg-blue-900/50 z-10 mix-blend-multiply"></div>
          <img src={getStepImage()} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" alt="Background" />
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-2">
              {!logoError ? (
                <img src={logoUrl} className="h-10 object-contain brightness-0 invert" alt="Logo" onError={() => setLogoError(true)} />
              ) : (
                <div className="flex items-center gap-2">
                  <i className="ph ph-truck text-blue-400 text-3xl"></i>
                  <h2 className="text-2xl font-bold tracking-tight">Trans <span className="text-blue-400">Fábula</span></h2>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-3xl font-light mb-4 leading-tight">
                {step === 1 && currentT.hero1} 
                {step === 2 && currentT.hero2} 
                {step === 3 && currentT.hero3} 
                {step === 4 && currentT.hero4}
              </h3>
              <p className="text-blue-100 font-light text-sm">{currentT.heroSub}</p>
            </div>
          </div>
        </div>

        {/* Painel Direito */}
        <div className="w-full md:w-7/12 flex flex-col p-8 md:p-10 lg:p-12 overflow-y-auto relative">
          
          {step < 4 && (
            <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center bg-gray-50 rounded-full border border-gray-200 p-1 z-10">
              <button onClick={() => setLang("pt")} className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${lang === "pt" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-200"}`}>PT</button>
              <button onClick={() => setLang("es")} className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${lang === "es" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-200"}`}>ES</button>
            </div>
          )}

          <div className="mb-6 pb-4 border-b border-gray-100 mt-8 md:mt-0 pr-20">
            <div className="flex flex-col gap-2">
              <div className="h-10 md:h-12 flex items-center justify-start">
                {!logoError ? (
                  <img src={logoUrl} className="h-full object-contain max-w-[200px]" alt="Logo" onError={() => setLogoError(true)} />
                ) : (
                  <div className="flex items-center gap-2">
                    <i className="ph ph-truck text-blue-600 text-[28px]"></i>
                    <span className="text-2xl font-bold text-gray-800">Trans <span className="text-blue-600">Fábula</span></span>
                  </div>
                )}
              </div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide">{currentT.title}</h2>
            </div>
          </div>

          {step < 4 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-bold text-gray-800">
                  {step === 1 && currentT.step1} 
                  {step === 2 && currentT.step2} 
                  {step === 3 && currentT.step3}
                </h1>
                <span className="text-xs md:text-sm font-medium text-blue-600 bg-blue-50 py-1 px-3 rounded-full whitespace-nowrap ml-2">
                  {currentT.stepXofY}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
              </div>
            </div>
          )}

          <div className="flex-grow flex flex-col justify-start">
            
            {/* ETAPA 1 */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <p className="text-gray-500 text-sm">{currentT.intro1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.name}</label>
                    <div className="relative">
                      <i className="ph ph-user absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder={currentT.phName} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.company}</label>
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder={currentT.phCompany} />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.contactPref}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.prefContato === "email" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"}`}>
                      <input type="radio" name="prefContato" value="email" className="sr-only" checked={formData.prefContato === "email"} onChange={handleChange} />
                      <i className={"ph ph-envelope-simple text-[24px] " + (formData.prefContato === "email" ? "text-blue-600" : "text-gray-400")}></i>
                      <span className={`text-sm font-medium ${formData.prefContato === "email" ? "text-blue-700" : "text-gray-600"}`}>{currentT.email}</span>
                    </label>
                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.prefContato === "whatsapp" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-200"}`}>
                      <input type="radio" name="prefContato" value="whatsapp" className="sr-only" checked={formData.prefContato === "whatsapp"} onChange={handleChange} />
                      <i className={"ph ph-whatsapp-logo text-[24px] " + (formData.prefContato === "whatsapp" ? "text-green-600" : "text-gray-400")}></i>
                      <span className={`text-sm font-medium ${formData.prefContato === "whatsapp" ? "text-green-700" : "text-gray-600"}`}>{currentT.whatsapp}</span>
                    </label>
                  </div>
                </div>

                {formData.prefContato === "email" && (
                  <div className="space-y-1 animate-fadeIn">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.emailLabel}</label>
                    <div className="relative">
                      <i className="ph ph-envelope-simple absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder="email@dominio.com" />
                    </div>
                  </div>
                )}

                {formData.prefContato === "whatsapp" && (
                  <div className="space-y-1 animate-fadeIn">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.whatsappLabel}</label>
                    <div className="relative">
                      <i className="ph ph-phone absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none shadow-sm" placeholder="+55 (00) 00000-0000" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ETAPA 2 */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-3 mb-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.opType}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`cursor-pointer border rounded-xl py-3 px-2 flex items-center justify-center gap-2 transition-all ${formData.operacao === "exportacao" ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500 text-blue-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      <input type="radio" name="operacao" value="exportacao" className="sr-only" checked={formData.operacao === "exportacao"} onChange={handleChange} />
                      <i className={"ph ph-arrow-up-right text-[18px] " + (formData.operacao === "exportacao" ? "text-blue-600" : "text-gray-400")}></i>
                      <span className="font-semibold text-xs md:text-sm text-center">{currentT.export}</span>
                    </label>
                    <label className={`cursor-pointer border rounded-xl py-3 px-2 flex items-center justify-center gap-2 transition-all ${formData.operacao === "importacao" ? "border-green-500 bg-green-50 ring-1 ring-green-500 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      <input type="radio" name="operacao" value="importacao" className="sr-only" checked={formData.operacao === "importacao"} onChange={handleChange} />
                      <i className={"ph ph-arrow-down-right text-[18px] " + (formData.operacao === "importacao" ? "text-green-600" : "text-gray-400")}></i>
                      <span className="font-semibold text-xs md:text-sm text-center">{currentT.import}</span>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{formData.operacao === "exportacao" ? currentT.originBr : currentT.originExt}</label>
                    <div className="relative">
                      <i className="ph ph-map-pin absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="text" name="origem" value={formData.origem} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder={formData.operacao === "exportacao" ? currentT.phOrigExp : currentT.phOrigImp} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{formData.operacao === "exportacao" ? currentT.destExt : currentT.destBr}</label>
                    <div className="relative">
                      <i className="ph ph-map-pin absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="text" name="destino" value={formData.destino} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder={formData.operacao === "exportacao" ? currentT.phDestExp : currentT.phDestImp} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.border}</label>
                  <div className="relative">
                    <i className="ph ph-map-trifold absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                    <input type="text" name="fronteira" value={formData.fronteira} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" placeholder={currentT.phBorder} />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.vehicle}</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["sider", "bau", "refrigerado", "aberto"].map((tipo) => (
                      <label key={tipo} className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all text-center ${formData.veiculo === tipo ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-gray-200 hover:border-blue-200"}`}>
                        <input type="radio" name="veiculo" value={tipo} className="sr-only" checked={formData.veiculo === tipo} onChange={handleChange} />
                        {tipo === "sider" && <i className={"ph ph-truck text-[24px] " + (formData.veiculo === tipo ? "text-blue-600" : "text-gray-400")}></i>}
                        {tipo === "bau" && <i className={"ph ph-package text-[24px] " + (formData.veiculo === tipo ? "text-blue-600" : "text-gray-400")}></i>}
                        {tipo === "refrigerado" && <i className={"ph ph-snowflake text-[24px] " + (formData.veiculo === tipo ? "text-blue-600" : "text-gray-400")}></i>}
                        {tipo === "aberto" && <i className={"ph ph-box-arrow-up text-[24px] " + (formData.veiculo === tipo ? "text-blue-600" : "text-gray-400")}></i>}
                        <span className={`text-[11px] md:text-xs font-semibold capitalize ${formData.veiculo === tipo ? "text-blue-700" : "text-gray-500"}`}>{veiculos[tipo][lang]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3 */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.grossWeight}</label>
                    <input type="number" name="peso" value={formData.peso} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder={currentT.phPeso} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.volume}</label>
                    <input type="text" name="volume" value={formData.volume} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder={currentT.phVol} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.packaging}</label>
                    <div className="relative">
                      <select name="embalagem" value={formData.embalagem} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none appearance-none pr-10 cursor-pointer">
                        {embalagens.map(emb => <option key={emb.id} value={emb.id}>{emb[lang]}</option>)}
                      </select>
                      <i className="ph ph-caret-down absolute right-3 top-3.5 text-gray-500 text-[18px]"></i>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">Incoterm</label>
                    <div className="relative">
                      <select name="incoterm" value={formData.incoterm} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none appearance-none pr-10 cursor-pointer font-medium">
                        <option value="FCA">FCA</option><option value="EXW">EXW</option><option value="CPT">CPT</option><option value="CIP">CIP</option>
                        <option value="DAP">DAP</option><option value="DDP">DDP</option><option value="FOB">FOB</option><option value="CIF">CIF</option><option value="Outro">Outro</option>
                      </select>
                      <i className="ph ph-caret-down absolute right-3 top-3.5 text-gray-500 text-[18px]"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <label className="text-sm font-medium text-gray-800 flex items-center gap-2 mb-3">{currentT.urgencyLabel}</label>
                  <div className="relative px-2">
                    <input type="range" min="1" max="4" name="urgencia" value={formData.urgencia} onChange={handleChange} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wider">
                      <span>{currentT.urgencyMin}</span><span>{currentT.urgencyMax}</span>
                    </div>
                  </div>
                  <div className="text-center mt-3 p-2 bg-white rounded-lg border border-blue-100 shadow-sm">
                    <span className={`text-sm font-semibold ${formData.urgencia === "4" ? "text-red-600" : "text-blue-700"}`}>
                      {urgenciaLabels[lang][formData.urgencia]}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-start">
                  <i className="ph ph-info text-orange-500 text-[24px] mt-0.5"></i>
                  <div>
                    <h4 className="text-sm font-semibold text-orange-800 mb-1">{currentT.docsInfo}</h4>
                    <p className="text-xs text-orange-600 leading-relaxed">
                      {currentT.docsSubInfo}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder={currentT.obs}></textarea>
                </div>
              </div>
            )}

            {/* ETAPA 4 */}
            {step === 4 && (
              <div className="flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                  <i className="ph ph-check-circle text-[32px]"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{currentT.successTitle}</h2>
                <p className="text-gray-500 text-sm">{currentT.successSub}</p>
                
                <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-5 text-left shadow-inner relative overflow-hidden">
                  {formData.urgencia === "4" && (
                    <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                      <i className="ph ph-fire text-[12px]"></i> {lang === "pt" ? "URGENTE" : "URGENTE"}
                    </div>
                  )}
                  <div className="flex items-center gap-2 border-b border-gray-200 pb-2 mb-3">
                    <i className="ph ph-file-text text-blue-600 text-[18px]"></i>
                    <h3 className="font-semibold text-gray-700 text-sm">{currentT.summary}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs md:text-sm">
                    <div className="text-gray-500">{currentT.client}:</div>
                    <div className="font-medium text-gray-800">{formData.nome}</div>
                    
                    <div className="text-gray-500">{currentT.route}:</div>
                    <div className="font-medium text-gray-800 truncate" title={`${formData.origem} > ${formData.destino} (${formData.fronteira})`}>
                      {formData.origem} <i className="ph ph-arrow-right inline text-[10px]"></i> {formData.destino} <br/>
                      <span className="text-xs text-blue-600">{currentT.via} {formData.fronteira}</span>
                    </div>
                    
                    <div className="text-gray-500">{currentT.vehicle}:</div>
                    <div className="font-medium text-gray-800 capitalize">{veiculos[formData.veiculo][lang]} / {embalagens.find(e => e.id === formData.embalagem)?.[lang]}</div>
                    
                    <div className="text-gray-500">{currentT.status}:</div>
                    <div className="font-medium text-gray-800">{urgenciaLabels[lang][formData.urgencia].substring(3)}</div>
                  </div>
                </div>

                <div className="w-full pt-2">
                  <button onClick={resetForm} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                    <i className="ph ph-arrow-counter-clockwise text-[18px]"></i> {currentT.btnConfirm}
                  </button>
                </div>
              </div>
            )}
          </div>

          {step < 4 && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              {step === 1 ? <div></div> : (
                <button onClick={prevStep} type="button" className="flex items-center gap-1 md:gap-2 text-gray-500 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors text-sm md:text-base">
                  <i className="ph ph-arrow-left text-[18px]"></i> {currentT.btnBack}
                </button>
              )}
              {step < 3 ? (
                <button onClick={nextStep} type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 md:px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ml-auto text-sm md:text-base">
                  {currentT.btnNext} <i className="ph ph-arrow-right text-[18px]"></i>
                </button>
              ) : (
                <button onClick={handleSubmit} type="button" disabled={isSubmitting} className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 md:px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ml-auto text-sm md:text-base ${isSubmitting ? "opacity-75 cursor-wait" : ""}`}>
                  {isSubmitting ? currentT.btnSending : currentT.btnSubmit}
                  {!isSubmitting && <i className="ph ph-paper-plane-right text-[18px]"></i>}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: #2563eb; cursor: pointer; margin-top: -6px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: transform 0.1s; }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.15); }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 8px; cursor: pointer; background: #e5e7eb; border-radius: 4px; }
      `}} />
    </div>
  );
}
