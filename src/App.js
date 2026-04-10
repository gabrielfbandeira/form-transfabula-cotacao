import React, { useState, useEffect } from "react";

export default function App() {
  // Configurações de Título e Favicon dinâmico
  useEffect(() => {
    document.title = "Cotação - Trans Fábula";

    const truckIconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none"/>
        <path d="M176,80h38.7a8,8,0,0,1,7.2,4.5l30.7,61.4a7.9,7.9,0,0,1,.7,3.3V184a8,8,0,0,1-8,8H216a32,32,0,0,1-64,0H104a32,32,0,0,1-64,0H24a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H176V152h64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        <circle cx="72" cy="192" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        <circle cx="184" cy="192" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        <style>
          @media (prefers-color-scheme: dark) { svg { color: white; } }
          @media (prefers-color-scheme: light) { svg { color: #002b5c; } }
        </style>
      </svg>
    `;

    const blob = new Blob([truckIconSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = url;

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

  const WEB3FORMS_ACCESS_KEY = "0aac5767-8581-4116-82c6-e3920d7393cb"; 
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [lang, setLang] = useState("pt");

  const logoUrl = "https://lh3.googleusercontent.com/d/1P7fhoER3300U2DjueP20EeoairS4P4p0";

  const [formData, setFormData] = useState({
    nome: "", empresa: "", prefContato: "email", email: "", whatsapp: "",
    operacao: "exportacao", origem: "", destino: "", fronteira: "", veiculo: "sider",
    peso: "", volume: "", embalagem: "pallet", incoterm: "FCA",
    descricao: "", targetPreco: "", urgencia: "3"
  });

  const t = {
    pt: {
      title: "Solicitação de Cotação", step1: "1. Dados de Contato", step2: "2. Rota e Veículo", step3: "3. Detalhes da Carga",
      stepXofY: `Passo ${step} de 3`, intro1: "Para iniciarmos seu atendimento personalizado, com quem estamos falando?",
      name: "Seu Nome *", company: "Empresa", contactPref: "Como prefere receber o retorno?",
      email: "E-mail", whatsapp: "WhatsApp", emailLabel: "Endereço de E-mail *", whatsappLabel: "Número do WhatsApp *",
      opType: "Tipo de Operação *", export: "Exportação", import: "Importação", domestic: "Nacional",
      originBr: "Origem (Brasil) *", originExt: "Origem (Exterior) *", originSimple: "Cidade de Origem *",
      destExt: "Destino (Exterior) *", destBr: "Destino (Brasil) *", destSimple: "Cidade de Destino *",
      border: "Fronteira Desejada (Desembaraço) *", vehicle: "Tipo de Veículo (FTL)",
      grossWeight: "Peso Bruto (kg)", volume: "Volume (CBM)", packaging: "Embalagem",
      urgencyLabel: "Qual a urgência dessa cotação?", urgencyMin: "Pesquisa", urgencyMax: "Urgente",
      productLabel: "Qual produto será transportado? *",
      targetLabel: "Target de preço desejado (Opcional)",
      btnBack: "Voltar", btnNext: "Próximo", btnSubmit: "Finalizar e Enviar", btnSending: "Enviando...",
      successTitle: "Cotação Enviada!", successSub: "Nossa equipe já recebeu seus dados e retornaremos em breve com o orçamento.",
      summary: "Resumo do Envio", client: "Cliente", route: "Rota / Fronteira", via: "Via", status: "Status", btnConfirm: "Fazer Nova Cotação",
      phName: "Ex: João Silva", phCompany: "Ex: Minha Empresa Ltda", phOrigExp: "Ex: São Paulo, SP", phOrigImp: "Ex: Buenos Aires, AR",
      phDestExp: "Ex: Santiago, CL", phDestImp: "Ex: Curitiba, PR", phBorder: "Ex: Uruguaiana/RS, Paso de los Libres...",
      phPeso: "12.000", phVol: "45", phPhone: "+55 (00) 00000-0000",
      phProduct: "Ex: Peças automotivas, Grãos, Eletrônicos...",
      phTarget: "Ex: R$ 10.000,00 ou US$ 2.000,00",
      hero1: "Cotação FTL rápida e sem burocracia.", hero2: "Especialistas em rotas terrestres no Mercosul.",
      hero3: "Informação precisa gera a melhor rota.", hero4: "Tudo certo! Recebemos sua Cotação.",
      heroSub: "Veículos dedicados, segurança e inteligência logística de ponta a ponta.",
    },
    es: {
      title: "Solicitud de Cotización", step1: "1. Dados de Contato", step2: "2. Ruta y Vehículo", step3: "3. Detalles de Carga",
      stepXofY: `Paso ${step} de 3`, intro1: "Para comenzar con su atención personalizada, ¿con quién hablamos?",
      name: "Su Nome *", company: "Empresa", contactPref: "¿Cómo prefiere ser contactado?",
      email: "Correo", whatsapp: "WhatsApp", emailLabel: "Correo Electrónico *", whatsappLabel: "Número de WhatsApp *",
      opType: "Tipo de Operación *", export: "Exportación", import: "Importación", domestic: "Nacional (BR)",
      originBr: "Origen (Brasil) *", originExt: "Origen (Exterior) *", originSimple: "Ciudad de Origen *",
      destExt: "Destino (Exterior) *", destBr: "Destino (Brasil) *", destSimple: "Ciudad de Destino *",
      border: "Frontera de Cruce (Aduana) *", vehicle: "Tipo de Vehículo (FTL)",
      grossWeight: "Peso Bruto (kg)", volume: "Volumen (CBM)", packaging: "Embalaje",
      urgencyLabel: "¿Cuál es la urgencia de esta cotización?", urgencyMin: "Consulta", urgencyMax: "Urgente",
      productLabel: "¿Qué produto se transportará? *",
      targetLabel: "Objetivo de precio deseado (Opcional)",
      btnBack: "Volver", btnNext: "Siguiente", btnSubmit: "Finalizar y Enviar", btnSending: "Enviando...",
      successTitle: "¡Cotización Enviada!", successSub: "Nuestro equipo ya recibió sus datos. Nos pondremos en contacto a la brevedad.",
      summary: "Resumen del Envío", client: "Cliente", route: "Ruta / Frontera", via: "Por", status: "Estado", btnConfirm: "Hacer Nova Cotización",
      phName: "Ej: Juan Pérez", phCompany: "Ej: Mi Empresa S.A.", phOrigExp: "Ej: São Paulo, SP (Brasil)", phOrigImp: "Ej: Buenos Aires, AR",
      phDestExp: "Ej: Santiago, CL", phDestImp: "Ej: Curitiba, PR (Brasil)", phBorder: "Ej: Paso de los Libres, Uruguaiana...",
      phPeso: "12.000", phVol: "45", phPhone: "+54 9 11 0000-0000",
      phProduct: "Ej: Repuestos, Granos, Electrónicos...",
      phTarget: "Ej: R$ 10.000,00 o US$ 2.000,00",
      hero1: "Cotización FTL rápida y sin burocracia.", hero2: "Especialistas en rutas terrestres en el Mercosur.",
      hero3: "Información precisa gera la mejor rota.", hero4: "¡Todo listo! Hemos recibido su Cotización.",
      heroSub: "Vehículos exclusivos, seguridad e inteligencia logística de punta a punta.",
    }
  };

  const currentT = t[lang];

  const urgenciaLabels = {
    pt: { 1: "🧊 Apenas pesquisa de mercado", 2: "📅 Planejamento (Próximas semanas)", 3: "🚚 Pronto para embarcar (Dias)", 4: "🔥 Embarque Urgente (Imediato)" },
    es: { 1: "🧊 Solo consulta de mercado", 2: "📅 Planificación (Próximas semanas)", 3: "🚚 Listo para embarcar (Días)", 4: "🔥 Embarque Urgente (Inmediato)" }
  };

  const veiculos = {
    sider: { pt: "Sider", es: "Sider" },
    bau: { pt: "Baú", es: "Furgón" },
    refrigerado: { pt: "Refrigerado", es: "Refrigerado" },
    aberto: { pt: "Aberto\nGraneleiro", es: "Abierto\nVaranda" },
    nao_aplicavel: { pt: "Não\nAplicável", es: "No\nAplica" }
  };

  const embalagens = [
    { id: "pallet", pt: "Pallet", es: "Pallet" }, { id: "caixa", pt: "Caixa", es: "Caja" },
    { id: "tambor", pt: "Tambor", es: "Tambor" }, { id: "bigbag", pt: "Big Bag", es: "Big Bag" },
    { id: "bolsas_sacos", pt: "Bolsas/Sacos", es: "Bolsas/Sacos" }, { id: "outros", pt: "Outros...", es: "Otros..." }
  ];

  const incoterms = ["EXW", "FCA", "CPT", "CIP", "DAP", "DPU", "DDP", "Outros"];

  const formatWhatsApp = (val, language) => {
    let digits = val.replace(/\D/g, "");
    if (language === "pt") {
      if (digits.length <= 11) {
        return digits.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      }
      return digits.slice(0, 11).replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else {
      return digits.length > 0 ? "+" + digits : "";
    }
  };

  const formatWeight = (val) => {
    let digits = val.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "whatsapp" || name === "peso" || name === "volume") {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, "") }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.nome || (formData.prefContato === "email" && !formData.email) || (formData.prefContato === "whatsapp" && !formData.whatsapp)) {
        alert(lang === "pt" ? "Por favor, preencha os campos obrigatórios." : "Por favor, complete los campos obligatorios.");
        return;
      }
    }
    if (step === 2) {
      const needsBorder = formData.operacao !== 'nacional';
      if (!formData.origem || !formData.destino || (needsBorder && !formData.fronteira)) {
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
      peso: "", volume: "", embalagem: "pallet", incoterm: "FCA",
      descricao: "", targetPreco: "", urgencia: "3"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.descricao) {
        alert(lang === "pt" ? "Por favor, informe qual produto será transportado." : "Por favor, informe qué produto se transportará.");
        return;
    }
    setIsSubmitting(true);

    const embPT = embalagens.find(e => e.id === formData.embalagem)?.pt || formData.embalagem;
    const contato = formData.prefContato === "email" ? formData.email : formatWhatsApp(formData.whatsapp, "pt");
    const isNacional = formData.operacao === "nacional";
    const veiculoNome = veiculos[formData.veiculo].pt.replace("\n", " ").toUpperCase();

    const relatorioVisual = `
==============================================
NOVA SOLICITAÇÃO DE COTAÇÃO - TRANS FÁBULA
==============================================

[ DADOS DO SOLICITANTE ]
----------------------------------------------
Nome: ${formData.nome}
Empresa: ${formData.empresa || "Não informada"}
Preferência de Contato: ${formData.prefContato.toUpperCase()}
Contato Direto: ${contato}

[ LOGÍSTICA E ROTA ]
----------------------------------------------
Operação: ${formData.operacao.toUpperCase()}
Origem: ${formData.origem}
Destino: ${formData.destino}
${isNacional ? "" : `Fronteira Sugerida: ${formData.fronteira}`}
Veículo Solicitado: ${veiculoNome}

[ DETALHES DA CARGA ]
----------------------------------------------
Produto: ${formData.descricao}
Peso Bruto: ${formatWeight(formData.peso)} kg
Volume: ${formData.volume} m³
Embalagem: ${embPT}
${isNacional ? "" : `Incoterm: ${formData.incoterm}`}
Urgência: ${urgenciaLabels.pt[formData.urgencia]}
Target de Preço: ${formData.targetPreco || "Não informado"}

==============================================
Solicitação via Portal Trans Fábula Vercel
==============================================
    `;

    const submissionData = new FormData();
    submissionData.append("access_key", WEB3FORMS_ACCESS_KEY);
    submissionData.append("subject", `Cotação FTL (${formData.operacao.toUpperCase()}) - ${formData.empresa || formData.nome}`);
    submissionData.append("from_name", "Portal Trans Fábula");
    submissionData.append("replyto", formData.email || "");
    submissionData.append("message", relatorioVisual);
    submissionData.append("_Cliente", formData.nome);
    submissionData.append("_Rota", `${formData.origem} -> ${formData.destino}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: submissionData
      });

      if (response.ok) {
        setStep(4);
      } else {
        const result = await response.json();
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      alert("Erro de conexão.");
    }
    setIsSubmitting(false);
  };

  const getStepImage = () => {
    switch (step) {
      case 1: return { url: "https://lh3.googleusercontent.com/d/1KvrbJXTsUZPZWCOCAtyIbz57B3fpNcFC", position: "center" };
      case 2: return { url: "https://lh3.googleusercontent.com/d/10eZ0XL2Z5hxUDZMPaNHY_oBLjMeKty9P", position: "center" };
      case 3: return { url: "https://lh3.googleusercontent.com/d/1rqeNL2Z48oq9hUU68V_h8ECWHIi3Lt21", position: "center" };
      default: return { url: "https://lh3.googleusercontent.com/d/1KvrbJXTsUZPZWCOCAtyIbz57B3fpNcFC", position: "center" };
    }
  };

  const currentImage = getStepImage();

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-[720px] transition-all duration-500 ease-in-out">
        
        {/* Painel Esquerdo */}
        <div className="hidden md:block md:w-5/12 relative overflow-hidden bg-[#001f3f]">
          <div className="absolute inset-0 bg-[#001f3f]/50 z-10 mix-blend-multiply"></div>
          <img src={currentImage.url} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" style={{ objectPosition: currentImage.position }} alt="Frota Trans Fábula" />
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-2">
              {!logoError ? (
                <img src={logoUrl} className="h-10 object-contain brightness-0 invert" alt="Logo" onError={() => setLogoError(true)} />
              ) : (
                <div className="flex items-center gap-2">
                  <i className="ph ph-truck text-white text-3xl"></i>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Trans <span className="text-blue-300">Fábula</span></h2>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-3xl font-light mb-4 leading-tight">
                {step === 1 && currentT.hero1} {step === 2 && currentT.hero2} {step === 3 && currentT.hero3} {step === 4 && currentT.hero4}
              </h3>
              <p className="text-blue-100 font-light text-sm">{currentT.heroSub}</p>
            </div>
          </div>
        </div>

        {/* Painel Direito */}
        <div className="w-full md:w-7/12 flex flex-col p-8 md:p-10 lg:p-12 overflow-y-auto relative">
          
          {step < 4 && (
            <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center bg-gray-50 rounded-full border border-gray-200 p-1 z-10">
              <button onClick={() => setLang("pt")} className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${lang === "pt" ? "bg-[#002b5c] text-white shadow-md" : "text-gray-500 hover:bg-gray-200"}`}>PT</button>
              <button onClick={() => setLang("es")} className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${lang === "es" ? "bg-[#002b5c] text-white shadow-md" : "text-gray-500 hover:bg-gray-200"}`}>ES</button>
            </div>
          )}

          <div className="mb-6 pb-4 border-b border-gray-100 mt-8 md:mt-0 pr-20">
            <div className="flex flex-col gap-2">
              <div className="h-10 md:h-12 flex items-center justify-start">
                {!logoError ? (
                  <img src={logoUrl} className="h-full object-contain max-w-[200px]" alt="Logo Trans Fábula" onError={() => setLogoError(true)} />
                ) : (
                  <div className="flex items-center gap-2">
                    <i className="ph ph-truck text-[#002b5c] text-[28px]"></i>
                    <span className="text-2xl font-bold text-gray-800">Trans <span className="text-[#002b5c]">Fábula</span></span>
                  </div>
                )}
              </div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide">{currentT.title}</h2>
            </div>
          </div>

          {step < 4 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-bold text-[#002b5c]">
                  {step === 1 && currentT.step1} {step === 2 && currentT.step2} {step === 3 && currentT.step3}
                </h1>
                <span className="text-xs md:text-sm font-medium text-[#002b5c] bg-blue-50 py-1 px-3 rounded-full whitespace-nowrap ml-2">{currentT.stepXofY}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div className="bg-[#002b5c] h-1.5 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
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
                      <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phName} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.company}</label>
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phCompany} />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.contactPref}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.prefContato === "email" ? "border-[#002b5c] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="prefContato" value="email" className="sr-only" checked={formData.prefContato === "email"} onChange={handleChange} />
                      <i className={"ph ph-envelope-simple text-[24px] " + (formData.prefContato === "email" ? "text-[#002b5c]" : "text-gray-400")}></i>
                      <span className={`text-sm font-medium ${formData.prefContato === "email" ? "text-[#002b5c]" : "text-gray-600"}`}>{currentT.email}</span>
                    </label>
                    <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${formData.prefContato === "whatsapp" ? "border-[#25d366] bg-green-50 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}>
                      <input type="radio" name="prefContato" value="whatsapp" className="sr-only" checked={formData.prefContato === "whatsapp"} onChange={handleChange} />
                      <i className={"ph ph-whatsapp-logo text-[24px] " + (formData.prefContato === "whatsapp" ? "text-[#25d366]" : "text-gray-400")}></i>
                      <span className={`text-sm font-medium ${formData.prefContato === "whatsapp" ? "text-[#075e54]" : "text-gray-600"}`}>{currentT.whatsapp}</span>
                    </label>
                  </div>
                </div>

                <div className="animate-fadeIn">
                {formData.prefContato === "email" ? (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.emailLabel}</label>
                    <div className="relative">
                      <i className="ph ph-envelope-simple absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder="email@dominio.com" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.whatsappLabel}</label>
                    <div className="relative">
                      <i className="ph ph-phone absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="tel" name="whatsapp" value={formatWhatsApp(formData.whatsapp, lang)} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#25d366] outline-none shadow-sm font-mono" placeholder={currentT.phPhone} />
                    </div>
                  </div>
                )}
                </div>
              </div>
            )}

            {/* ETAPA 2: OPERAÇÃO E ROTA */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-3 mb-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.opType}</label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className={`cursor-pointer border rounded-xl py-3 px-1 flex flex-col items-center justify-center gap-1 transition-all ${formData.operacao === "exportacao" ? "border-[#002b5c] bg-blue-50 ring-1 ring-[#002b5c] text-[#002b5c]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      <input type="radio" name="operacao" value="exportacao" className="sr-only" checked={formData.operacao === "exportacao"} onChange={handleChange} />
                      <i className={"ph ph-arrow-up-right text-[18px] " + (formData.operacao === "exportacao" ? "text-[#002b5c]" : "text-gray-400")}></i>
                      <span className="font-semibold text-[10px] uppercase text-center">{currentT.export}</span>
                    </label>
                    <label className={`cursor-pointer border rounded-xl py-3 px-1 flex flex-col items-center justify-center gap-1 transition-all ${formData.operacao === "importacao" ? "border-[#2ecc71] bg-green-50 ring-1 ring-[#2ecc71] text-[#27ae60]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      <input type="radio" name="operacao" value="importacao" className="sr-only" checked={formData.operacao === "importacao"} onChange={handleChange} />
                      <i className={"ph ph-arrow-down-right text-[18px] " + (formData.operacao === "importacao" ? "text-[#27ae60]" : "text-gray-400")}></i>
                      <span className="font-semibold text-[10px] uppercase text-center">{currentT.import}</span>
                    </label>
                    <label className={`cursor-pointer border rounded-xl py-3 px-1 flex flex-col items-center justify-center gap-1 transition-all ${formData.operacao === "nacional" ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500 text-amber-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                      <input type="radio" name="operacao" value="nacional" className="sr-only" checked={formData.operacao === "nacional"} onChange={handleChange} />
                      <i className={"ph ph-map-pin text-[18px] " + (formData.operacao === "nacional" ? "text-amber-600" : "text-gray-400")}></i>
                      <span className="font-semibold text-[10px] uppercase text-center">{currentT.domestic}</span>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      {formData.operacao === "exportacao" ? currentT.originBr : (formData.operacao === "importacao" ? currentT.originExt : currentT.originSimple)}
                    </label>
                    <div className="relative">
                      <i className="ph ph-map-pin absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input 
                        type="text" name="origem" value={formData.origem} onChange={handleChange} 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" 
                        placeholder={formData.operacao === "importacao" ? currentT.phOrigImp : currentT.phOrigExp} 
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      {formData.operacao === "exportacao" ? currentT.destExt : (formData.operacao === "importacao" ? currentT.destBr : currentT.destSimple)}
                    </label>
                    <div className="relative">
                      <i className="ph ph-map-pin absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input 
                        type="text" name="destino" value={formData.destino} onChange={handleChange} 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" 
                        placeholder={formData.operacao === "exportacao" ? currentT.phDestExp : currentT.phDestImp} 
                      />
                    </div>
                  </div>
                </div>

                {formData.operacao !== "nacional" && (
                  <div className="space-y-1 animate-fadeIn">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.border}</label>
                    <div className="relative">
                      <i className="ph ph-map-trifold absolute left-3 top-3.5 text-gray-400 text-[18px]"></i>
                      <input type="text" name="fronteira" value={formData.fronteira} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none shadow-sm" placeholder={currentT.phBorder} />
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">{currentT.vehicle}</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.keys(veiculos).map((tipo) => (
                      <label key={tipo} className={`cursor-pointer border rounded-xl p-2 flex flex-col items-center justify-center gap-1.5 transition-all text-center ${formData.veiculo === tipo ? "border-[#002b5c] bg-blue-50 ring-1 ring-[#002b5c]" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="radio" name="veiculo" value={tipo} className="sr-only" checked={formData.veiculo === tipo} onChange={handleChange} />
                        {tipo === "sider" && <i className={"ph ph-truck text-[22px] " + (formData.veiculo === tipo ? "text-[#002b5c]" : "text-gray-400")}></i>}
                        {tipo === "bau" && <i className={"ph ph-package text-[22px] " + (formData.veiculo === tipo ? "text-[#002b5c]" : "text-gray-400")}></i>}
                        {tipo === "refrigerado" && <i className={"ph ph-snowflake text-[22px] " + (formData.veiculo === tipo ? "text-[#002b5c]" : "text-gray-400")}></i>}
                        {tipo === "aberto" && <i className={"ph ph-box-arrow-up text-[22px] " + (formData.veiculo === tipo ? "text-[#002b5c]" : "text-gray-400")}></i>}
                        {tipo === "nao_aplicavel" && <i className={"ph ph-prohibit text-[22px] " + (formData.veiculo === tipo ? "text-[#002b5c]" : "text-gray-400")}></i>}
                        <span className={`text-[10px] md:text-[11px] font-bold leading-tight ${formData.veiculo === tipo ? "text-[#002b5c]" : "text-gray-500"}`}>
                          {veiculos[tipo][lang].split("\n").map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 3: CARGA */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.grossWeight}</label>
                    <input type="text" name="peso" value={formatWeight(formData.peso)} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none" placeholder={currentT.phPeso} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.volume}</label>
                    <div className="relative flex items-center">
                      <input type="text" name="volume" value={formData.volume} onChange={handleChange} className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] outline-none" placeholder={currentT.phVol} />
                      <span className="absolute right-4 text-gray-400 font-bold text-sm">m³</span>
                    </div>
                  </div>
                </div>

                <div className={`grid ${formData.operacao === 'nacional' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 ml-1">{currentT.packaging}</label>
                    <div className="relative">
                      <select name="embalagem" value={formData.embalagem} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] bg-white outline-none appearance-none pr-10 cursor-pointer">
                        {embalagens.map(emb => <option key={emb.id} value={emb.id}>{emb[lang]}</option>)}
                      </select>
                      <i className="ph ph-caret-down absolute right-3 top-3.5 text-gray-500 text-[18px]"></i>
                    </div>
                  </div>
                  {formData.operacao !== "nacional" && (
                    <div className="space-y-1 animate-fadeIn">
                      <label className="text-sm font-medium text-gray-700 ml-1">Incoterm</label>
                      <div className="relative">
                        <select name="incoterm" value={formData.incoterm} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#002b5c] bg-white outline-none appearance-none pr-10 cursor-pointer font-medium">
                          {incoterms.map(term => <option key={term} value={term}>{term}</option>)}
                        </select>
                        <i className="ph ph-caret-down absolute right-3 top-3.5 text-gray-500 text-[18px]"></i>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-[#f8fafc] border border-blue-100 rounded-xl p-4">
                  <label className="text-sm font-medium text-[#002b5c] mb-3 block">{currentT.urgencyLabel}</label>
                  <input type="range" min="1" max="4" name="urgencia" value={formData.urgencia} onChange={handleChange} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#002b5c]" />
                  <div className="text-center mt-3 p-2 bg-white rounded-lg border border-blue-50 shadow-sm">
                    <span className={`text-sm font-semibold ${formData.urgencia === "4" ? "text-red-600" : "text-[#002b5c]"}`}>{urgenciaLabels[lang][formData.urgencia]}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-base font-bold text-[#002b5c] flex items-center gap-2">
                    <i className="ph ph-package text-xl"></i> {currentT.productLabel}
                  </label>
                  <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="3" className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-[#002b5c] outline-none resize-none transition-all" placeholder={currentT.phProduct}></textarea>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-base font-bold text-[#002b5c] flex items-center gap-2">
                    <i className="ph ph-coin text-xl"></i> {currentT.targetLabel}
                  </label>
                  <input 
                    type="text" name="targetPreco" value={formData.targetPreco} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border-2 border-blue-50 focus:border-[#002b5c] outline-none shadow-sm transition-all" 
                    placeholder={currentT.phTarget} 
                  />
                </div>
              </div>
            )}

            {/* ETAPA 4 */}
            {step === 4 && (
              <div className="flex flex-col items-center justify-center text-center space-y-5 animate-fadeIn py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm">
                  <i className="ph ph-check-circle text-[32px]"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{currentT.successTitle}</h2>
                <p className="text-gray-500 text-sm max-w-[300px]">{currentT.successSub}</p>
                <button onClick={resetForm} className="mt-4 w-full bg-[#002b5c] hover:bg-[#001f3f] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                  <i className="ph ph-arrow-counter-clockwise text-[18px]"></i> {currentT.btnConfirm}
                </button>
              </div>
            )}
          </div>

          {step < 4 && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              {step === 1 ? <div></div> : (
                <button onClick={prevStep} type="button" className="flex items-center gap-1 md:gap-2 text-gray-500 hover:text-[#002b5c] font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base">
                  <i className="ph ph-arrow-left text-[18px]"></i> {currentT.btnBack}
                </button>
              )}
              {step < 3 ? (
                <button onClick={nextStep} type="button" className="bg-[#002b5c] hover:bg-[#001f3f] text-white font-medium py-2.5 px-5 md:px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ml-auto text-sm md:text-base">
                  {currentT.btnNext} <i className="ph ph-arrow-right text-[18px]"></i>
                </button>
              ) : (
                <button onClick={handleSubmit} type="button" disabled={isSubmitting} className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 md:px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ml-auto text-sm md:text-base ${isSubmitting ? "opacity-75 cursor-wait" : ""}`}>
                  {isSubmitting ? "Enviando..." : currentT.btnSubmit}
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
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: #002b5c; cursor: pointer; margin-top: -6px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: transform 0.1s; }
        input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.15); }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 8px; cursor: pointer; background: #e2e8f0; border-radius: 4px; }
      `}} />
    </div>
  );
}
