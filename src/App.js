import React, { useState, useEffect } from "react";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lang, setLang] = useState("pt");

  // Configurações de Título, Favicon e Dependências
  useEffect(() => {
    document.title = "Cotação - Trans Fábula";

    const truckIconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none"/>
        <path d="M176,80h38.7a8,8,0,0,1,7.2,4.5l30.7,61.4a7.9,7.9,0,0,1,.7,3.3V184a8,8,0,0,1-8,8H216a32,32,0,0,1-64,0H104a32,32,0,0,1-64,0H24a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H176V152h64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        <circle cx="72" cy="192" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        <circle cx="184" cy="192" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        <style>@media (prefers-color-scheme: dark) { svg { color: white; } } @media (prefers-color-scheme: light) { svg { color: #002b5c; } }</style>
      </svg>
    `;
    const blob = new Blob([truckIconSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = url;

    const loadScript = (id, src) => {
      return new Promise((resolve) => {
        if (document.getElementById(id)) return resolve();
        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    Promise.all([
      loadScript("tailwind-cdn", "https://cdn.tailwindcss.com"),
      loadScript("phosphor-cdn", "https://unpkg.com/@phosphor-icons/web")
    ]).then(() => {
      setTimeout(() => setIsReady(true), 200);
    });
  }, []);

  const WEB3FORMS_ACCESS_KEY = "0aac5767-8581-4116-82c6-e3920d7393cb"; 

  const [formData, setFormData] = useState({
    nome: "", empresa: "",
    contactEmail: true, contactWhatsapp: false, 
    email: "", whatsapp: "",
    operacao: "exportacao", origem: "", destino: "", fronteira: "", veiculo: "sider",
    peso: "", volume: "", embalagem: "pallet", incoterm: "FCA",
    descricao: "", targetPreco: "", urgencia: "3"
  });

  const t = {
    pt: {
      title: "Solicitação de Cotação", step1: "1. Dados de Contato", step2: "2. Rota e Veículo", step3: "3. Detalhes da Carga",
      stepXofY: `Passo ${step} de 3`, intro1: "Para iniciarmos seu atendimento personalizado, como deseja ser contatado?",
      name: "Seu Nome *", company: "Empresa", contactPref: "Como prefere receber o retorno? (Selecione pelo menos um)",
      email: "E-mail", whatsapp: "WhatsApp", emailLabel: "Endereço de E-mail *", whatsappLabel: "Número do WhatsApp *",
      opType: "Tipo de Operação *", export: "Exportação", import: "Importação", domestic: "Nacional",
      originBr: "Origem (Brasil) *", originExt: "Origem (Exterior) *", originSimple: "Cidade de Origem *",
      destExt: "Destino (Exterior) *", destBr: "Destino (Brasil) *", destSimple: "Cidade de Destino *",
      border: "Fronteira Desejada (Desembaraço) *", vehicle: "Tipo de Veículo (FTL)",
      grossWeight: "Peso Bruto (kg)", volume: "Volume (CBM)", packaging: "Embalagem",
      urgencyLabel: "Qual a urgência dessa cotação?", urgencyMin: "Pesquisa", urgencyMax: "Urgente",
      productLabel: "Qual produto será transportado? *", targetLabel: "Target de preço desejado (Opcional)",
      btnBack: "Voltar", btnNext: "Próximo", btnSubmit: "Finalizar e Enviar", btnSending: "Enviando...",
      successTitle: "Cotação Enviada!", successSub: "Nossa equipe já recebeu seus dados e retornaremos em breve.",
      btnConfirm: "Fazer Nova Cotação",
      phName: "Ex: João Silva", phCompany: "Ex: Minha Empresa Ltda",
      phOrigBr: "Ex: São Paulo, SP", phOrigExt: "Ex: Buenos Aires, AR",
      phDestBr: "Ex: Curitiba, PR", phDestExt: "Ex: Santiago, CL",
      phBorder: "Ex: Uruguaiana/RS, Paso de los Libres...",
      phPeso: "12.000", phVol: "45", phPhone: "+55 (00) 00000-0000",
      phProduct: "Ex: Peças automotivas, Grãos, Eletrônicos...",
      phTarget: "Ex: R$ 10.000,00 ou US$ 2.000,00",
      hero1: "Cotação FTL rápida e sem burocracia.", hero2: "Especialistas em rotas terrestres no Mercosul.",
      hero3: "Informação precisa gera a melhor rota.", hero4: "Tudo certo! Recebemos sua Cotação.",
      heroSub: "Veículos dedicados, segurança e inteligência logística de ponta a ponta.",
      contactError: "Por favor, selecione pelo menos um meio de contato."
    },
    es: {
      title: "Solicitud de Cotización", step1: "1. Dados de Contato", step2: "2. Ruta y Vehículo", step3: "3. Detalles de Carga",
      stepXofY: `Paso ${step} de 3`, intro1: "Para comenzar, ¿cómo desea ser contactado?",
      name: "Su Nome *", company: "Empresa", contactPref: "¿Cómo prefiere ser contactado? (Elija al menos uno)",
      email: "Correo", whatsapp: "WhatsApp", emailLabel: "Correo Electrónico *", whatsappLabel: "Número de WhatsApp *",
      opType: "Tipo de Operación *", export: "Exportación", import: "Importación", domestic: "Nacional (BR)",
      originBr: "Origen (Brasil) *", originExt: "Origen (Exterior) *", originSimple: "Ciudad de Origen *",
      destExt: "Destino (Exterior) *", destBr: "Destino (Brasil) *", destSimple: "Ciudad de Destino *",
      border: "Frontera de Cruce (Aduana) *", vehicle: "Tipo de Vehículo (FTL)",
      grossWeight: "Peso Bruto (kg)", volume: "Volumen (CBM)", packaging: "Embalaje",
      urgencyLabel: "¿Cuál es la urgencia de esta cotización?", urgencyMin: "Consulta", urgencyMax: "Urgente",
      productLabel: "¿Qué produto se transportará? *", targetLabel: "Objetivo de precio deseado (Opcional)",
      btnBack: "Volver", btnNext: "Siguiente", btnSubmit: "Finalizar y Enviar", btnSending: "Enviando...",
      successTitle: "¡Cotización Enviada!", successSub: "Nuestro equipo ya recibió sus datos. Nos pondremos en contacto.",
      btnConfirm: "Hacer Nova Cotización",
      phName: "Ej: Juan Pérez", phCompany: "Ej: Mi Empresa S.A.",
      phOrigBr: "Ej: São Paulo, SP (Brasil)", phOrigExt: "Ej: Buenos Aires, AR",
      phDestBr: "Ej: Curitiba, PR (Brasil)", phDestExt: "Ej: Santiago, CL",
      phBorder: "Ej: Paso de los Libres, Uruguaiana...",
      phPeso: "12.000", phVol: "45", phPhone: "+54 9 11 0000-0000",
      phProduct: "Ej: Repuestos, Granos, Electrónicos...",
      phTarget: "Ej: R$ 10.000,00 o US$ 2.000,00",
      hero1: "Cotización FTL rápida y sin burocracia.", hero2: "Especialistas en rutas terrestres en el Mercosur.",
      hero3: "Información precisa gera la mejor rota.", hero4: "¡Todo listo! Hemos recibido su Cotización.",
      heroSub: "Vehículos exclusivos, seguridad e inteligencia logística de punta a punta.",
      contactError: "Por favor, seleccione al menos un medio de contacto."
    }
  };

  const currentT = t[lang];
  const logoUrl = "https://lh3.googleusercontent.com/d/1P7fhoER3300U2DjueP20EeoairS4P4p0";

  const veiculos = {
    sider: { pt: "Sider", es: "Sider" }, bau: { pt: "Baú", es: "Furgón" }, refrigerado: { pt: "Refrigerado", es: "Refrigerado" },
    aberto: { pt: "Aberto\nGraneleiro", es: "Abierto\nVaranda" }, nao_aplicavel: { pt: "Não\nAplicável", es: "No\nAplica" }
  };

  const embalagens = [
    { id: "pallet", pt: "Pallet", es: "Pallet" }, { id: "caixa", pt: "Caixa", es: "Caja" },
    { id: "tambor", pt: "Tambor", es: "Tambor" }, { id: "bigbag", pt: "Big Bag", es: "Big Bag" },
    { id: "bolsas_sacos", pt: "Bolsas/Sacos", es: "Bolsas/Sacos" }, { id: "outros", pt: "Outros...", es: "Otros..." }
  ];

  const incoterms = ["EXW", "FCA", "CPT", "CIP", "DAP", "DPU", "DDP", "Outros"];

  const getStepImage = () => {
    switch (step) {
      case 1: return { url: "https://lh3.googleusercontent.com/d/1KvrbJXTsUZPZWCOCAtyIbz57B3fpNcFC", position: "center" };
      case 2: return { url: "https://lh3.googleusercontent.com/d/10eZ0XL2Z5hxUDZMPaNHY_oBLjMeKty9P", position: "center" };
      case 3: return { url: "https://lh3.googleusercontent.com/d/1rqeNL2Z48oq9hUU68V_h8ECWHIi3Lt21", position: "center" };
      default: return { url: "https://lh3.googleusercontent.com/d/1KvrbJXTsUZPZWCOCAtyIbz57B3fpNcFC", position: "center" };
    }
  };

  const formatWhatsApp = (val, language) => {
    let digits = val.replace(/\D/g, "");
    if (language === "pt") {
      if (digits.length <= 11) return digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      return digits.slice(0, 11).replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    return digits.length > 0 ? "+" + digits : "";
  };

  const formatWeight = (val) => val.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "whatsapp" || name === "peso" || name === "volume") {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, "") }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleContact = (type) => {
    setFormData(prev => {
      const newState = { ...prev };
      if (type === 'email') newState.contactEmail = !prev.contactEmail;
      if (type === 'whatsapp') newState.contactWhatsapp = !prev.contactWhatsapp;
      return newState;
    });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nome) return alert(lang === 'pt' ? "Informe seu nome." : "Informe su nombre.");
      if (!formData.contactEmail && !formData.contactWhatsapp) return alert(currentT.contactError);
      if (formData.contactEmail && !formData.email) return alert(lang === 'pt' ? "Informe seu e-mail." : "Informe su correo.");
      if (formData.contactWhatsapp && !formData.whatsapp) return alert(lang === 'pt' ? "Informe seu WhatsApp." : "Informe su WhatsApp.");
    }
    if (step === 2) {
      const needsBorder = formData.operacao !== 'nacional';
      if (!formData.origem || !formData.destino || (needsBorder && !formData.fronteira)) {
        alert(lang === "pt" ? "Preencha origem, destino e fronteira." : "Complete origen, destino y frontera.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const resetForm = () => {
    setStep(1);
    setFormData({
      nome: "", empresa: "", contactEmail: true, contactWhatsapp: false, email: "", whatsapp: "",
      operacao: "exportacao", origem: "", destino: "", fronteira: "", veiculo: "sider",
      peso: "", volume: "", embalagem: "pallet", incoterm: "FCA",
      descricao: "", targetPreco: "", urgencia: "3"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.descricao) return alert(lang === "pt" ? "Informe o produto." : "Informe el producto.");
    setIsSubmitting(true);

    const isNacional = formData.operacao === "nacional";
    const waLink = formData.whatsapp ? `https://wa.me/${formData.whatsapp}` : "Não informado";
    const embPT = embalagens.find(e => e.id === formData.embalagem)?.pt || formData.embalagem;
    const veiculoNome = veiculos[formData.veiculo].pt.replace("\n", " ");

    const relatorioVisual = `
==============================================
NOVA SOLICITAÇÃO DE COTAÇÃO - TRANS FÁBULA
==============================================

[ DADOS DO SOLICITANTE ]
----------------------------------------------
Nome: ${formData.nome}
Empresa: ${formData.empresa || "Não informada"}

[ CONTATOS ]
E-mail: ${formData.contactEmail ? formData.email : "Não selecionado"}
WhatsApp: ${formData.contactWhatsapp ? formData.whatsapp : "Não selecionado"}
LINK DIRETO WHATSAPP: ${waLink}

[ LOGÍSTICA E ROTA ]
----------------------------------------------
Operação: ${formData.operacao.toUpperCase()}
Rota: ${formData.origem} -> ${formData.destino}
${isNacional ? "" : `Fronteira: ${formData.fronteira}`}
Veículo: ${veiculoNome}

[ CARGA ]
----------------------------------------------
Produto: ${formData.descricao}
Peso Bruto: ${formatWeight(formData.peso)} kg | Volume: ${formData.volume} m³
Embalagem: ${embPT}
Incoterm: ${isNacional ? "N/A" : formData.incoterm}
Target de Preço: ${formData.targetPreco || "Não informado"}
Urgência: ${formData.urgencia} / 4
    `;

    const submissionData = new FormData();
    submissionData.append("access_key", WEB3FORMS_ACCESS_KEY);
    submissionData.append("subject", `Cotação (${formData.operacao.toUpperCase()}) - ${formData.empresa || formData.nome}`);
    submissionData.append("from_name", "Portal Trans Fábula");
    submissionData.append("replyto", formData.email || "");
    submissionData.append("message", relatorioVisual);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: submissionData
      });
      if (response.ok) setStep(4);
      else alert("Erro no envio.");
    } catch (error) { alert("Erro de conexão."); }
    setIsSubmitting(false);
  };

  const urgenciaLabels = {
    pt: { 1: "🧊 Apenas pesquisa", 2: "📅 Planejamento", 3: "🚚 Pronto (Dias)", 4: "🔥 Urgente (Imediato)" },
    es: { 1: "🧊 Solo consulta", 2: "📅 Planificación", 3: "🚚 Listo (Días)", 4: "🔥 Urgente (Inmediato)" }
  };

  if (!isReady) return (
    <div className="min-h-screen bg-[#001f3f] flex flex-col items-center justify-center text-white font-sans">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-medium tracking-widest uppercase opacity-75">Carregando Trans Fábula...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 font-sans text-gray-800 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-[720px]">
        
        {/* Painel Esquerdo */}
        <div className="hidden md:block md:w-5/12 relative overflow-hidden bg-[#001f3f]">
          <div className="absolute inset-0 bg-[#001f3f]/50 z-10 mix-blend-multiply"></div>
          <img src={getStepImage().url} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000" style={{ objectPosition: getStepImage().position }} alt="Frota" />
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-2">
              <img src={logoUrl} className="h-10 object-contain brightness-0 invert" alt="Logo" onError={() => setLogoError(true)} />
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
            <div className="absolute top-6 right-6 flex items-center bg-gray-50 rounded-full border p-1 z-10">
              <button onClick={() => setLang('pt')} className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${lang === 'pt' ? 'bg-[#002b5c] text-white shadow-sm' : 'text-gray-500'}`}>PT</button>
              <button onClick={() => setLang('es')} className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${lang === 'es' ? 'bg-[#002b5c] text-white shadow-sm' : 'text-gray-500'}`}>ES</button>
            </div>
          )}

          <div className="mb-6 pb-4 border-b border-gray-100 pr-20">
            <img src={logoUrl} className="h-10 md:h-12 object-contain" alt="Logo Trans Fábula" />
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mt-2">{currentT.title}</h2>
          </div>

          {step < 4 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-bold text-[#002b5c]">{step === 1 && currentT.step1} {step === 2 && currentT.step2} {step === 3 && currentT.step3}</h1>
                <span className="text-xs font-medium text-[#002b5c] bg-blue-50 py-1 px-3 rounded-full">{currentT.stepXofY}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden"><div className="bg-[#002b5c] h-1.5 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div></div>
            </div>
          )}

          <div className="flex-grow flex flex-col justify-start">
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <p className="text-gray-500 text-sm">{currentT.intro1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.name}</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phName} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.company}</label>
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phCompany} />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.contactPref}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => toggleContact('email')} className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all ${formData.contactEmail ? 'border-[#002b5c] bg-blue-50' : 'border-gray-200 opacity-60 hover:opacity-100'}`}>
                      <i className={`ph ph-envelope-simple text-2xl ${formData.contactEmail ? 'text-[#002b5c]' : 'text-gray-400'}`}></i>
                      <span className="text-sm font-bold uppercase">{currentT.email}</span>
                    </button>
                    <button onClick={() => toggleContact('whatsapp')} className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all ${formData.contactWhatsapp ? 'border-[#25d366] bg-green-50' : 'border-gray-200 opacity-60 hover:opacity-100'}`}>
                      <i className={`ph ph-whatsapp-logo text-2xl ${formData.contactWhatsapp ? 'text-[#25d366]' : 'text-gray-400'}`}></i>
                      <span className="text-sm font-bold uppercase">{currentT.whatsapp}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {formData.contactEmail && (
                    <div className="space-y-1 animate-fadeIn">
                      <label className="text-sm font-medium text-gray-700 ml-1">{currentT.emailLabel}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none" placeholder="email@dominio.com" />
                    </div>
                  )}
                  {formData.contactWhatsapp && (
                    <div className="space-y-1 animate-fadeIn">
                      <label className="text-sm font-medium text-gray-700 ml-1">{currentT.whatsappLabel}</label>
                      <input type="tel" name="whatsapp" value={formatWhatsApp(formData.whatsapp, lang)} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#25d366] outline-none font-mono" placeholder={currentT.phPhone} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-3 mb-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.opType}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['exportacao', 'importacao', 'nacional'].map(op => (
                      <label key={op} className={`cursor-pointer border rounded-xl py-3 px-1 flex flex-col items-center gap-1 transition-all ${formData.operacao === op ? 'border-[#002b5c] bg-blue-50 ring-1 ring-[#002b5c]' : 'border-gray-200'}`}>
                        <input type="radio" name="operacao" value={op} className="sr-only" checked={formData.operacao === op} onChange={handleChange} />
                        <i className={`ph ${op === 'exportacao' ? 'ph-arrow-up-right' : op === 'importacao' ? 'ph-arrow-down-right' : 'ph-map-pin'} text-lg`}></i>
                        <span className="font-semibold text-[10px] uppercase">{currentT[op === 'nacional' ? 'domestic' : op === 'importacao' ? 'import' : 'export']}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        {formData.operacao === 'importacao' ? currentT.originExt : (formData.operacao === 'nacional' ? currentT.originSimple : currentT.originBr)}
                    </label>
                    <input 
                        type="text" name="origem" value={formData.origem} onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" 
                        placeholder={formData.operacao === "importacao" ? currentT.phOrigExt : currentT.phOrigBr} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                        {formData.operacao === 'exportacao' ? currentT.destExt : (formData.operacao === 'nacional' ? currentT.destSimple : currentT.destBr)}
                    </label>
                    <input 
                        type="text" name="destino" value={formData.destino} onChange={handleChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" 
                        placeholder={formData.operacao === "exportacao" ? currentT.phDestExt : currentT.phDestBr} 
                    />
                  </div>
                </div>

                {formData.operacao !== "nacional" && (
                  <div className="space-y-1 animate-fadeIn">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.border}</label>
                    <input type="text" name="fronteira" value={formData.fronteira} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phBorder} />
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.vehicle}</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.keys(veiculos).map((tipo) => (
                      <label key={tipo} className={`cursor-pointer border rounded-xl p-2 flex flex-col items-center justify-center gap-1.5 transition-all text-center ${formData.veiculo === tipo ? "border-[#002b5c] bg-blue-50 ring-1 ring-[#002b5c]" : "border-gray-200"}`}>
                        <input type="radio" name="veiculo" value={tipo} className="sr-only" checked={formData.veiculo === tipo} onChange={handleChange} />
                        <i className={`ph ${tipo === 'sider' ? 'ph-truck' : tipo === 'bau' ? 'ph-package' : tipo === 'refrigerado' ? 'ph-snowflake' : tipo === 'aberto' ? 'ph-box-arrow-up' : 'ph-prohibit'} text-xl`}></i>
                        <span className="text-[10px] font-bold leading-tight">{veiculos[tipo][lang].split("\n").map((line, i) => (<span key={i} className="block">{line}</span>))}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.grossWeight}</label>
                    <input type="text" name="peso" value={formatWeight(formData.peso)} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phPeso} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.volume}</label>
                    <div className="relative flex items-center">
                      <input type="text" name="volume" value={formData.volume} onChange={handleChange} className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phVol} />
                      <span className="absolute right-4 text-gray-400 font-bold text-sm">m³</span>
                    </div>
                  </div>
                </div>

                <div className={`grid ${formData.operacao === 'nacional' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                  <div className="space-y-1"><label className="text-sm font-medium text-gray-700 ml-1">{currentT.packaging}</label><select name="embalagem" value={formData.embalagem} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] bg-white outline-none pr-10 cursor-pointer shadow-sm">{embalagens.map(emb => <option key={emb.id} value={emb.id}>{emb[lang]}</option>)}</select></div>
                  {formData.operacao !== "nacional" && (
                    <div className="space-y-1 animate-fadeIn"><label className="text-sm font-medium text-gray-700 ml-1">Incoterm</label><select name="incoterm" value={formData.incoterm} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] bg-white outline-none pr-10 cursor-pointer font-medium shadow-sm">{incoterms.map(term => <option key={term} value={term}>{term}</option>)}</select></div>
                  )}
                </div>

                <div className="bg-[#f8fafc] border border-blue-100 rounded-xl p-4 shadow-sm">
                  <label className="text-sm font-medium text-[#002b5c] mb-3 block">{currentT.urgencyLabel}</label>
                  <input type="range" min="1" max="4" name="urgencia" value={formData.urgencia} onChange={handleChange} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#002b5c]" />
                  <div className="text-center mt-3 p-2 bg-white rounded-lg border border-blue-50 shadow-sm"><span className={`text-sm font-semibold ${formData.urgencia === "4" ? "text-red-600" : "text-[#002b5c]"}`}>{urgenciaLabels[lang][formData.urgencia]}</span></div>
                </div>

                <div className="space-y-1 pt-2"><label className="text-base font-bold text-[#002b5c] flex items-center gap-2"><i className="ph ph-package text-xl"></i> {currentT.productLabel}</label><textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-[#002b5c] outline-none resize-none transition-all shadow-sm" placeholder={currentT.phProduct}></textarea></div>
                <div className="space-y-1 pt-2"><label className="text-base font-bold text-[#002b5c] flex items-center gap-2"><i className="ph ph-coin text-xl"></i> {currentT.targetLabel}</label><input type="text" name="targetPreco" value={formData.targetPreco} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-blue-50 focus:border-[#002b5c] outline-none shadow-sm transition-all" placeholder={currentT.phTarget} /></div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm"><i className="ph ph-check-circle text-[32px]"></i></div>
                <h2 className="text-2xl font-bold text-gray-800">{currentT.successTitle}</h2>
                <p className="text-gray-500 text-sm max-w-[300px]">{currentT.successSub}</p>
                <button onClick={resetForm} className="mt-4 w-full bg-[#002b5c] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-[#001f3f] transition-all"><i className="ph ph-arrow-counter-clockwise text-[18px]"></i> {currentT.btnConfirm}</button>
              </div>
            )}
          </div>

          {step < 4 && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              {step === 1 ? <div></div> : (<button onClick={prevStep} type="button" className="flex items-center gap-1 text-gray-500 hover:text-[#002b5c] font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"><i className="ph ph-arrow-left text-[18px]"></i> {currentT.btnBack}</button>)}
              <button onClick={step < 3 ? nextStep : handleSubmit} type="button" disabled={isSubmitting} className={`bg-[#002b5c] text-white font-medium py-2.5 px-6 rounded-xl shadow-md flex items-center gap-2 ml-auto hover:bg-[#001f3f] transition-all ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}>
                {isSubmitting ? "Enviando..." : (step < 3 ? currentT.btnNext : currentT.btnSubmit)}
                {!isSubmitting && <i className={`ph ${step < 3 ? 'ph-arrow-right' : 'ph-paper-plane-right'} text-[18px]`}></i>}
              </button>
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; } input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: #002b5c; cursor: pointer; margin-top: -6px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: transform 0.1s; } input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 8px; cursor: pointer; background: #e2e8f0; border-radius: 4px; }`}} />
    </div>
  );
}
