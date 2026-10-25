import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Search, ShieldCheck, Truck, Sparkles, 
  MessageCircle, X, ChevronRight, Check, Eye, MapPin, 
  Phone, Instagram, Facebook, Star, CreditCard, Building2, 
  QrCode, Wallet, DollarSign, Download, ArrowLeft, CheckCircle2,
  Lock, Copy, FileText
} from 'lucide-react';

// === BASE DE DATOS DE PRODUCTOS ===
const PRODUCTS = [
  {
    id: 'polar-hombre',
    title: 'Polares para Hombre',
    category: 'polares',
    gender: 'Hombre',
    price: 110000,
    rating: 4.9,
    reviews: 28,
    badge: 'Más Vendido',
    description: 'Chaqueta polar térmica, suave, cómoda y de gran resistencia para el día a día o la montaña.',
    features: ['Cuello alto para mayor protección', 'Bolsillo en pecho con cierre', 'Bolsillos laterales con cierre', 'Tela polar de alta densidad'],
    colors: [
      { name: 'Verde Oliva', hex: '#3b4332' },
      { name: 'Negro', hex: '#181818' },
      { name: 'Gris Oscuro', hex: '#4e5154' },
      { name: 'Gris Claro', hex: '#a8abae' },
      { name: 'Beige / Camel', hex: '#b59d7c' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'polar-mujer',
    title: 'Polares para Mujer',
    category: 'polares',
    gender: 'Mujer',
    price: 110000,
    rating: 4.8,
    reviews: 34,
    badge: 'Favorito',
    description: 'Corte femenino diseñado para acompañarte en cada aventura sin perder estilo ni confort.',
    features: ['Cierre completo ultra resistente', 'Bolsillo frontal en pecho con cremallera', 'Bolsillos laterales profundos', 'Termicidad superior'],
    colors: [
      { name: 'Verde Botella', hex: '#0f3a33' },
      { name: 'Negro', hex: '#181818' },
      { name: 'Gris', hex: '#5c6066' },
      { name: 'Beige', hex: '#d6c0a5' },
      { name: 'Azul Marino', hex: '#162840' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'polar-personalizada',
    title: 'Polares Personalizadas (Empresas / Dotaciones)',
    category: 'polares',
    gender: 'Unisex',
    price: 125000,
    rating: 5.0,
    reviews: 42,
    badge: 'Personalizable',
    description: 'Bordamos tu marca, nombre o logotipo favorito en prendas polares de alta durabilidad.',
    features: ['Bordado de alta definición', 'Ideal para equipos de trabajo y clínicas', 'Resistente a lavado continuo', 'Amplia paleta de colores'],
    colors: [
      { name: 'Negro', hex: '#181818' },
      { name: 'Azul Navy', hex: '#182b45' },
      { name: 'Gris', hex: '#666a70' },
      { name: 'Rojo', hex: '#991b1b' },
      { name: 'Vino', hex: '#581c24' },
      { name: 'Verde Pino', hex: '#0e382b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'chaqueta-alaska',
    title: 'Chaquetas Alaska Ref. Outdoor',
    category: 'chaquetas',
    gender: 'Unisex',
    price: 165000,
    rating: 4.9,
    reviews: 51,
    badge: 'Térmica Pro',
    description: 'Chaqueta funcional contra el frío extremo, con cierres herméticos y ajuste anatómico.',
    features: ['Cuello alto protector', 'Bolsillo en pecho e interiores', 'Ajuste en puños por velcro', 'Protección cortavientos'],
    colors: [
      { name: 'Azul Oscuro', hex: '#142236' },
      { name: 'Negro', hex: '#121212' },
      { name: 'Gris Táctico', hex: '#484d52' },
      { name: 'Verde Oliva', hex: '#3e4734' },
      { name: 'Beige', hex: '#cbb69d' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'chaqueta-goretex',
    title: 'Chaquetas Gore-Tex Impermeables',
    category: 'chaquetas',
    gender: 'Unisex',
    price: 195000,
    rating: 5.0,
    reviews: 63,
    badge: 'Impermeable 100%',
    description: 'Tecnología impermeable que repele el agua por completo y te protege contra lluvias intensas y vientos fríos.',
    features: ['Capucha ajustable con visera', 'Tecnología cortavientos', 'Cierres de alta resistencia sellados', 'Tejido altamente duradero'],
    colors: [
      { name: 'Rojo Aventura', hex: '#b91c1c' },
      { name: 'Negro Mate', hex: '#171717' },
      { name: 'Azul Noche', hex: '#1e293b' },
      { name: 'Verde Militar', hex: '#3f4e38' },
      { name: 'Mostaza', hex: '#ca8a04' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1504826260979-242151745b3a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'uniforme-aqua',
    title: 'Uniforme Antifluidos Ref. Aqua',
    category: 'uniformes',
    gender: 'Mujer',
    price: 135000,
    rating: 4.9,
    reviews: 19,
    badge: 'Antifluidos',
    description: 'Uniforme médico/estético con tecnología que repele líquidos y mantiene la frescura durante turnos extensos.',
    features: ['Repele líquidos y manchas', 'Cintura resortada con cordón ajuste', 'Bolsillo funcional superior', 'Tela ligera de secado rápido'],
    colors: [
      { name: 'Verde Aqua', hex: '#5f9ea0' },
      { name: 'Negro', hex: '#181818' },
      { name: 'Azul Navy', hex: '#1e3a5f' },
      { name: 'Gris', hex: '#6b7280' },
      { name: 'Rosado Viejo', hex: '#bc8f8f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'uniforme-newpolo',
    title: 'Uniforme Antifluidos Ref. New Polo',
    category: 'uniformes',
    gender: 'Mujer',
    price: 140000,
    rating: 4.8,
    reviews: 22,
    badge: 'Novedad',
    description: 'Diseño moderno con cuello tipo polo y pantalón estilo cargo para una apariencia profesional y distinguida.',
    features: ['Cuello tipo polo moderno', 'Pantalón cargo con bolsillos laterales', 'Tela antifluidos elástica', 'Ajuste anatómico'],
    colors: [
      { name: 'Beige Sahara', hex: '#b8a383' },
      { name: 'Verde Pino', hex: '#1b4d3e' },
      { name: 'Negro', hex: '#111111' },
      { name: 'Azul Rey', hex: '#1d4ed8' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'uniforme-eva',
    title: 'Uniforme Antifluidos Ref. Eva',
    category: 'uniformes',
    gender: 'Mujer',
    price: 135000,
    rating: 4.7,
    reviews: 15,
    badge: 'Confort',
    description: 'Uniforme con cuello en V estilizado, diseñado para brindar libertad de movimiento en todo momento.',
    features: ['Cuello V con ribete especial', 'Detalles a contraste', 'Pantalón jogger con resorte', 'Resistente a arrugas'],
    colors: [
      { name: 'Morado Amatista', hex: '#4c1d95' },
      { name: 'Azul Claro', hex: '#38bdf8' },
      { name: 'Verde Palma', hex: '#15803d' },
      { name: 'Negro', hex: '#181818' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'uniforme-amatista',
    title: 'Uniforme Antifluidos Ref. Amatista',
    category: 'uniformes',
    gender: 'Mujer',
    price: 138000,
    rating: 4.9,
    reviews: 21,
    badge: 'Premium',
    description: 'Elegante uniforme antifluidos en tono chocolate y variados colores, con detalle sutil en cuello.',
    features: ['Cuello moderno con detalle', 'Bolsillo funcional superior', 'Cintura ajustable', 'Gran resistencia al lavado'],
    colors: [
      { name: 'Chocolate / Café', hex: '#4a2e2b' },
      { name: 'Negro', hex: '#181818' },
      { name: 'Azul Navy', hex: '#1e3a5f' },
      { name: 'Vino', hex: '#581c24' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'uniforme-confort',
    title: 'Uniforme Antifluidos Ref. Confort',
    category: 'uniformes',
    gender: 'Mujer',
    price: 136000,
    rating: 4.8,
    reviews: 29,
    badge: 'Ergonomía',
    description: 'Ergonomía total con bolsillos tácticos laterales y cordón ajustable a contraste.',
    features: ['Bolsillos laterales funcionales', 'Cintura con resorte suave', 'Corte flexible', 'Ajuste perfecto'],
    colors: [
      { name: 'Azul Celeste', hex: '#7dd3fc' },
      { name: 'Verde Pino', hex: '#12392c' },
      { name: 'Rosa Viejo', hex: '#bc8f8f' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'conjunto-suplex',
    title: 'Conjunto Deportivo / Casual en Paño Suplex',
    category: 'conjuntos',
    gender: 'Mujer',
    price: 120000,
    rating: 4.9,
    reviews: 31,
    badge: 'Tendencia',
    description: 'El paño suplex se adapta perfectamente a tu cuerpo ofreciendo flexibilidad, confort y elegancia.',
    features: ['Elasticidad y ajuste perfecto', 'Textura suave al tacto', 'Ideal para climas frescos y templados', 'No se deforma'],
    colors: [
      { name: 'Verde Botella', hex: '#143d30' },
      { name: 'Rosado Viejo', hex: '#c08081' },
      { name: 'Negro', hex: '#181818' },
      { name: 'Beige', hex: '#d2b48c' },
      { name: 'Vino', hex: '#4a121a' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'conjunto-durazno',
    title: 'Conjunto en Piel de Durazno con Capucha',
    category: 'conjuntos',
    gender: 'Mujer',
    price: 128000,
    rating: 4.9,
    reviews: 47,
    badge: 'Ultra Suave',
    description: 'Textura extra suave y afelpada. Siente la máxima calidez y comodidad para estar en casa, viajar o salir.',
    features: ['Chaqueta con capucha y cremallera', 'Pantalón con pretina suave', 'Termicidad acolchada', 'Sensación ligera'],
    colors: [
      { name: 'Marrón / Rosado Cálido', hex: '#9e6268' },
      { name: 'Verde Pino', hex: '#12392c' },
      { name: 'Gris Oxford', hex: '#374151' },
      { name: 'Azul Oscuro', hex: '#1e293b' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pashmina-chal',
    title: 'Pashminas & Chales de Lana Tejida',
    category: 'pashminas',
    gender: 'Unisex',
    price: 45000,
    rating: 5.0,
    reviews: 39,
    badge: 'Accesorio Top',
    description: 'El toque de elegancia y abrigo ideal para cualquier outfits de clima frío o templado.',
    features: ['Tejido denso y abrigado', 'Diseño a cuadros clásico y sobrio', 'Textura súper suave al tacto', 'Medidas generosas'],
    colors: [
      { name: 'Cuadro Café / Crema', hex: '#8c6239' },
      { name: 'Cuadro Negro / Blanco', hex: '#262626' },
      { name: 'Gris Tejido', hex: '#737373' }
    ],
    sizes: ['Única'],
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800'
  }
];

// Lista de Bancos Colombia para PSE
const COLOMBIA_BANKS = [
  'Bancolombia', 'Nequi', 'Davivienda', 'Banco de Bogotá', 'BBVA Colombia',
  'Banco Daviplata', 'Banco Agrario', 'Banco Popular', 'Banco AV Villas',
  'Banco de Occidente', 'Scotiabank Colpatria', 'RappiPay', 'Lulo Bank', 'Nu Colombia'
];

// Ciudades Principales Colombia para envío
const COLOMBIA_CITIES = [
  'Bogotá D.C.', 'Medellín (Antioquia)', 'Cali (Valle)', 'Barranquilla (Atlántico)',
  'Bucaramanga (Santander)', 'Pereira (Risaralda)', 'Manizales (Caldas)', 'Cúcuta (Norte de Santander)',
  'Cartagena (Bolívar)', 'Ibagué (Tolima)', 'Pastos / Nariño', 'Villavicencio (Meta)', 'Otra ciudad / Municipio'
];

// Formateador de moneda en pesos colombianos
const formatCOP = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function App() {
  // Estado general
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Pasarela de Pagos / Checkout State
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('nequi'); // 'nequi' | 'pse' | 'card' | 'wompi' | 'cod'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Estados Formulario de Envío y Pago
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Bogotá D.C.',
    idType: 'CC',
    idNumber: '',
    personType: 'natural'
  });

  // Campos específicos de tarjeta
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    exp: '',
    cvc: '',
    installments: '1'
  });

  // Campos de Nequi
  const [nequiPhone, setNequiPhone] = useState('');

  // Campos PSE
  const [selectedBank, setSelectedBank] = useState('Bancolombia');

  // Modal Vista rápida
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [customText, setCustomText] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchGender = selectedGender === 'all' || p.gender === selectedGender || p.gender === 'Unisex';
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchGender && matchSearch;
    });
  }, [selectedCategory, selectedGender, searchQuery]);

  // Carrito
  const addToCart = (product, color, size, custom = '') => {
    const itemColor = color || product.colors[0];
    const cartItemId = `${product.id}-${itemColor.name}-${size}-${custom}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartItemId);
      if (existing) {
        return prev.map(item => 
          item.cartId === cartItemId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        cartId: cartItemId,
        product,
        color: itemColor,
        size,
        customText: custom,
        quantity: 1
      }];
    });

    showToast(`¡Añadido al carrito: ${product.title}!`);
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = paymentMethod === 'cod' ? 12000 : 0; // Recargo recaudo contra entrega si aplica
  const cartTotal = cartSubtotal + shippingFee;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Detectar franquicia de tarjeta
  const getCardBrand = (num) => {
    const clean = num.replace(/\s+/g, '');
    if (/^4/.test(clean)) return 'VISA';
    if (/^5[1-5]/.test(clean)) return 'MASTERCARD';
    if (/^3[47]/.test(clean)) return 'AMEX';
    return 'TARJETA';
  };

  // Procesar pago en pasarela
  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone) {
      alert('Por favor completa los datos de entrega (Nombre, Dirección y Teléfono).');
      return;
    }

    if (paymentMethod === 'nequi' && !nequiPhone) {
      alert('Por favor ingresa tu número de celular registrado en Nequi.');
      return;
    }

    setIsProcessingPayment(true);

    // Simulación de respuesta de pasarela
    setTimeout(() => {
      const orderId = `NOR-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        customer: { ...customerInfo },
        items: [...cart],
        subtotal: cartSubtotal,
        shipping: shippingFee,
        total: cartTotal,
        method: paymentMethod,
        bank: paymentMethod === 'pse' ? selectedBank : null,
        nequiNum: paymentMethod === 'nequi' ? nequiPhone : null
      };

      setCompletedOrder(newOrder);
      setIsProcessingPayment(false);
      setCart([]);
      setCheckoutStep('success');
    }, 2000);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0] || 'M');
    setCustomText('');
  };

  return (
    <div className="min-h-screen bg-[#0d2218] text-stone-100 font-sans antialiased selection:bg-[#c5a059] selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#102a1e] border border-[#c5a059] text-stone-100 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#c5a059]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#102a1e] via-[#1b3d2c] to-[#102a1e] text-[#f8f6f0] border-b border-[#2d523e] py-2 px-4 text-xs sm:text-sm text-center font-medium flex justify-center items-center gap-2">
        <Truck className="w-4 h-4 text-[#c5a059] animate-pulse" />
        <span>Envíos a todo Colombia 🇨🇴 | Pasarela Directa Nequi, PSE, Tarjeta & Contra Entrega</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0d2218]/90 backdrop-blur-md border-b border-[#1f3f2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8a6e34] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0d2218] rounded-full flex items-center justify-center">
                <span className="text-xl">🌲</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#f8f6f0] via-[#c5a059] to-amber-200 font-serif">
                NORTHON
              </span>
              <p className="text-[10px] tracking-widest uppercase text-stone-400 font-semibold -mt-1">
                Outdoor & Apparel Colombia
              </p>
            </div>
          </a>

          {/* Buscador central */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text"
              placeholder="Buscar polares, chaquetas, antifluidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#122c1f] border border-[#234834] rounded-full py-2 pl-10 pr-4 text-sm text-stone-200 placeholder-stone-400 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* Carrito */}
          <button 
            onClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }}
            className="relative bg-gradient-to-r from-[#163526] to-[#214a36] border border-[#2e5e45] hover:border-[#c5a059] text-stone-100 p-2.5 rounded-full flex items-center justify-center transition-all shadow-md group"
          >
            <ShoppingBag className="w-5 h-5 text-[#c5a059] group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c5a059] text-stone-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0d2218]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0d2218] via-[#102a1e] to-[#0d2218] py-16 lg:py-24 border-b border-[#1f3f2f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#163526] border border-[#c5a059]/40 text-[#c5a059] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Compra Directa Sin Intermediarios
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-[#f8f6f0] tracking-tight leading-tight">
                PREPÁRATE PARA EL FRÍO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f8f6f0] via-[#c5a059] to-[#8a6e34]">
                  Chaquetas y hoodies que marcan la diferencia
                </span>
              </h1>
              
              <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Selecciona tus prendas favoritas y paga al instante con PSE, Nequi, Tarjeta de Crédito o Pago Contra Entrega en toda Colombia.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#catalog" 
                  className="w-full sm:w-auto bg-gradient-to-r from-[#c5a059] to-[#9e7d3b] hover:from-[#d4af37] text-stone-950 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  Ver Catálogo Disponible
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Iconos de Pasarelas / Confianza */}
              <div className="pt-6 border-t border-[#1f3f2f] flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs text-stone-300">
                <div className="flex items-center gap-1.5 font-semibold text-[#f8f6f0]">
                  <Lock className="w-4 h-4 text-[#c5a059]" />
                  <span>Pago 100% Cifrado</span>
                </div>
                <span className="text-stone-600">|</span>
                <div className="flex items-center gap-2">
                  <span className="bg-[#e20074] text-white font-black px-2 py-0.5 rounded text-[10px]">NEQUI</span>
                  <span className="bg-[#0033a0] text-white font-black px-2 py-0.5 rounded text-[10px]">PSE</span>
                  <span className="bg-stone-800 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded text-[10px]">VISA / MC</span>
                  <span className="bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded text-[10px]">CONTRA ENTREGA</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[#2e5e45] shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800" 
                  alt="NORTHON Cold Weather" 
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2218] via-[#0d2218]/40 to-transparent"></div>
                <div className="absolute bottom-0 p-6 space-y-2">
                  <span className="bg-[#c5a059] text-stone-950 font-black text-xs px-2.5 py-1 rounded uppercase tracking-wider">
                    Línea Térmica Premium
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">Chaqueta Polar Fleece</h3>
                  <p className="text-stone-300 text-xs">Aislamiento térmico para la montaña y la ciudad.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1f3f2f]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">Catálogo Oficial NORTHON</h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">Explora prendas térmicas y dotaciones médicas/corporativas.</p>
          </div>

          <div className="flex items-center gap-2 bg-[#102a1e] p-1 rounded-xl border border-[#1f3f2f]">
            {['all', 'Hombre', 'Mujer'].map((g) => (
              <button 
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedGender === g ? 'bg-[#c5a059] text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                {g === 'all' ? 'Todos' : g}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros Categoría */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar">
          {[
            { id: 'all', label: 'Ver Todo' },
            { id: 'polares', label: 'Polares Térmicas' },
            { id: 'chaquetas', label: 'Chaquetas Outdoor' },
            { id: 'uniformes', label: 'Uniformes Antifluidos' },
            { id: 'conjuntos', label: 'Conjuntos Suplex / Durazno' },
            { id: 'pashminas', label: 'Pashminas & Chales' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#163526] text-[#c5a059] border-[#c5a059] shadow-lg'
                  : 'bg-[#102a1e]/60 border-[#1f3f2f] text-stone-300 hover:border-[#2e5e45]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-[#102a1e] border border-[#1f3f2f] hover:border-[#c5a059]/60 rounded-2xl overflow-hidden shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-[#0d2218]">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#c5a059] text-stone-950 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {product.badge}
                  </span>
                  <button 
                    onClick={() => openQuickView(product)}
                    className="absolute bottom-3 right-3 bg-[#0d2218]/80 hover:bg-[#c5a059] hover:text-black text-stone-200 p-2 rounded-xl backdrop-blur-md transition-all shadow"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="uppercase tracking-wider font-semibold text-[#c5a059]">{product.gender}</span>
                    <div className="flex items-center gap-1 text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-stone-100 text-lg leading-snug group-hover:text-[#c5a059] transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-stone-300 text-xs line-clamp-2">{product.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-[#1a382a]">
                  <div>
                    <span className="text-xs text-stone-400 block">Precio:</span>
                    <span className="text-lg font-bold text-white font-mono">{formatCOP(product.price)}</span>
                  </div>

                  <button 
                    onClick={() => openQuickView(product)}
                    className="bg-gradient-to-r from-[#163526] to-[#214a36] hover:from-[#c5a059] hover:to-[#9e7d3b] text-stone-100 hover:text-stone-950 border border-[#2e5e45] hover:border-[#c5a059] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#08150f] border-t border-[#162d22] py-12 text-center text-xs text-stone-400">
        <p>© {new Date().getFullYear()} NORTHON Outdoor & Apparel. Tienda Oficial Colombia.</p>
      </footer>

      {/* MODAL VISTA RÁPIDA DE PRODUCTO */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#102a1e] border border-[#2e5e45] rounded-2xl max-w-xl w-full p-6 relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 text-stone-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="grid sm:grid-cols-2 gap-6">
              <img src={quickViewProduct.image} alt={quickViewProduct.title} className="w-full h-56 object-cover rounded-xl" />
              <div className="space-y-3">
                <span className="text-[#c5a059] text-xs font-bold uppercase">{quickViewProduct.badge}</span>
                <h3 className="text-xl font-serif font-bold text-white">{quickViewProduct.title}</h3>
                <p className="text-2xl font-mono font-bold text-emerald-400">{formatCOP(quickViewProduct.price)}</p>

                {/* Color */}
                <div className="space-y-1">
                  <label className="text-xs text-stone-300">Color: {selectedColor?.name}</label>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((c, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedColor(c)}
                        className={`w-6 h-6 rounded-full border-2 ${selectedColor?.name === c.name ? 'border-[#c5a059] scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Talla */}
                <div className="space-y-1">
                  <label className="text-xs text-stone-300">Talla:</label>
                  <div className="flex gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button 
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-2.5 py-1 text-xs font-bold rounded border ${selectedSize === sz ? 'bg-[#c5a059] text-black border-[#c5a059]' : 'border-[#2e5e45] text-stone-300'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct, selectedColor, selectedSize, customText);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-[#c5a059] hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-xl text-sm transition-all"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER CARRITO Y CHECKOUT PASARELA DE PAGOS MULTI-MÉTODO */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="bg-[#102a1e] w-full max-w-lg h-full flex flex-col justify-between border-l border-[#2e5e45] shadow-2xl relative">
            
            {/* Header Drawer */}
            <div className="p-5 border-b border-[#1f3f2f] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
                <h3 className="font-serif font-bold text-lg text-white">
                  {checkoutStep === 'cart' && 'Tu Carrito de Compras'}
                  {checkoutStep === 'checkout' && 'Pasarela de Pago Segura'}
                  {checkoutStep === 'success' && '¡Pedido Confirmado!'}
                </h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-stone-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* VISTA 1: LISTA DEL CARRITO */}
            {checkoutStep === 'cart' && (
              <div className="p-5 flex-1 overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <p className="text-5xl">🛒</p>
                    <p className="text-stone-300 text-sm font-medium">Tu carrito está vacío</p>
                    <button onClick={() => setIsCartOpen(false)} className="px-4 py-2 bg-[#c5a059] text-stone-950 font-bold text-xs rounded-lg">
                      Ir al Catálogo
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartId} className="bg-[#0d2218] border border-[#1f3f2f] rounded-xl p-3 flex gap-3 relative">
                      <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="text-xs font-bold text-stone-100 truncate">{item.product.title}</h4>
                        <p className="text-[11px] text-stone-400">
                          Talla: <span className="text-stone-200">{item.size}</span> | Color: <span className="text-stone-200">{item.color.name}</span>
                        </p>
                        <p className="text-xs font-bold text-emerald-400 font-mono">{formatCOP(item.product.price * item.quantity)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => updateQuantity(item.cartId, -item.quantity)} className="text-stone-500 hover:text-rose-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-1.5 bg-[#143324] px-2 py-0.5 rounded border border-[#234834]">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="text-stone-300 text-xs font-bold">-</button>
                          <span className="text-xs font-bold text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="text-stone-300 text-xs font-bold">+</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* VISTA 2: PASARELA DE CHECKOUT MULTI-MÉTODO */}
            {checkoutStep === 'checkout' && (
              <form id="payment-form" onSubmit={handleProcessPayment} className="p-5 flex-1 overflow-y-auto space-y-5">
                
                {/* Datos de Envío */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> 1. Datos de Destino (Colombia)
                  </h4>
                  
                  <input 
                    type="text" 
                    required 
                    placeholder="Nombre y Apellidos *" 
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full bg-[#0d2218] border border-[#234834] rounded-lg p-2.5 text-xs text-white placeholder-stone-500 focus:border-[#c5a059] outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="tel" 
                      required 
                      placeholder="Teléfono Celular *" 
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full bg-[#0d2218] border border-[#234834] rounded-lg p-2.5 text-xs text-white placeholder-stone-500 focus:border-[#c5a059] outline-none"
                    />
                    <input 
                      type="email" 
                      placeholder="Correo electrónico" 
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full bg-[#0d2218] border border-[#234834] rounded-lg p-2.5 text-xs text-white placeholder-stone-500 focus:border-[#c5a059] outline-none"
                    />
                  </div>

                  <input 
                    type="text" 
                    required 
                    placeholder="Dirección de entrega (Ej: Cl. 45 # 12-34 Ap. 201) *" 
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full bg-[#0d2218] border border-[#234834] rounded-lg p-2.5 text-xs text-white placeholder-stone-500 focus:border-[#c5a059] outline-none"
                  />

                  <select 
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                    className="w-full bg-[#0d2218] border border-[#234834] rounded-lg p-2.5 text-xs text-white focus:border-[#c5a059] outline-none"
                  >
                    {COLOMBIA_CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#102a1e]">{c}</option>
                    ))}
                  </select>
                </div>

                {/* SELECTOR/CARRUSEL DE MÉTODOS DE PAGO */}
                <div className="space-y-3 pt-3 border-t border-[#1f3f2f]">
                  <h4 className="text-xs font-bold text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" /> 2. Selecciona Medio de Pago
                  </h4>

                  {/* Tabs Selector de Pagos */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 bg-[#0d2218] p-1.5 rounded-xl border border-[#1f3f2f]">
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('nequi')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] font-bold transition-all ${
                        paymentMethod === 'nequi' 
                          ? 'bg-[#e20074] text-white border-[#e20074] shadow' 
                          : 'border-transparent text-stone-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4 mb-0.5" />
                      Nequi
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pse')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] font-bold transition-all ${
                        paymentMethod === 'pse' 
                          ? 'bg-[#0033a0] text-white border-[#0033a0] shadow' 
                          : 'border-transparent text-stone-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-4 h-4 mb-0.5" />
                      PSE / Banco
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] font-bold transition-all ${
                        paymentMethod === 'card' 
                          ? 'bg-[#c5a059] text-stone-950 border-[#c5a059] shadow' 
                          : 'border-transparent text-stone-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mb-0.5" />
                      Tarjeta
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wompi')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] font-bold transition-all ${
                        paymentMethod === 'wompi' 
                          ? 'bg-[#2b6cb0] text-white border-[#2b6cb0] shadow' 
                          : 'border-transparent text-stone-400 hover:text-white'
                      }`}
                    >
                      <Wallet className="w-4 h-4 mb-0.5" />
                      Wompi / Bold
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] font-bold transition-all ${
                        paymentMethod === 'cod' 
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow' 
                          : 'border-transparent text-stone-400 hover:text-white'
                      }`}
                    >
                      <DollarSign className="w-4 h-4 mb-0.5" />
                      Contra Entrega
                    </button>

                  </div>

                  {/* FORMULARIO DINÁMICO SEGÚN MÉTODO SELECCIONADO */}
                  <div className="bg-[#0d2218] p-4 rounded-xl border border-[#1f3f2f] space-y-3">
                    
                    {/* OPCCIÓN 1: NEQUI */}
                    {paymentMethod === 'nequi' && (
                      <div className="space-y-3 text-center">
                        <div className="bg-white p-3 rounded-xl inline-block shadow-inner">
                          <QrCode className="w-28 h-28 text-stone-900 mx-auto" />
                          <span className="text-[10px] font-mono text-stone-800 font-bold block mt-1">Llave Nequi: 310-000-0000</span>
                        </div>
                        <p className="text-xs text-stone-300">
                          Ingresa el número celular de tu cuenta Nequi para recibir la notificación de cobro en tu App:
                        </p>
                        <input 
                          type="tel" 
                          placeholder="Número Celular Nequi (Ej: 3101234567)" 
                          value={nequiPhone}
                          onChange={(e) => setNequiPhone(e.target.value)}
                          className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2.5 text-xs text-white placeholder-stone-500 focus:border-[#e20074] outline-none text-center font-mono"
                        />
                      </div>
                    )}

                    {/* OPCIÓN 2: PSE / BANCOLOMBIA */}
                    {paymentMethod === 'pse' && (
                      <div className="space-y-3">
                        <label className="text-xs text-stone-300 block">Selecciona tu Entidad Bancaria:</label>
                        <select 
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2.5 text-xs text-white focus:border-[#0033a0] outline-none"
                        >
                          {COLOMBIA_BANKS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-1">Tipo de Persona</label>
                            <select 
                              value={customerInfo.personType}
                              onChange={(e) => setCustomerInfo({...customerInfo, personType: e.target.value})}
                              className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2 text-xs text-white"
                            >
                              <option value="natural">Persona Natural</option>
                              <option value="juridica">Persona Jurídica</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-400 block mb-1">Número de Cédula / NIT</label>
                            <input 
                              type="text" 
                              placeholder="Ej: 1012345678" 
                              value={customerInfo.idNumber}
                              onChange={(e) => setCustomerInfo({...customerInfo, idNumber: e.target.value})}
                              className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2 text-xs text-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPCIÓN 3: TARJETA CRÉDITO / DÉBITO */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-stone-400">Franquicia detectada:</span>
                          <span className="text-xs font-bold text-[#c5a059] bg-[#102a1e] px-2 py-0.5 rounded border border-[#234834]">
                            {getCardBrand(cardData.number)}
                          </span>
                        </div>

                        <input 
                          type="text" 
                          maxLength="19"
                          placeholder="Número de Tarjeta (4580 ...)" 
                          value={cardData.number}
                          onChange={(e) => setCardData({...cardData, number: e.target.value})}
                          className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2.5 text-xs text-white font-mono placeholder-stone-500 focus:border-[#c5a059] outline-none"
                        />

                        <input 
                          type="text" 
                          placeholder="Nombre impreso en la tarjeta" 
                          value={cardData.name}
                          onChange={(e) => setCardData({...cardData, name: e.target.value})}
                          className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2.5 text-xs text-white placeholder-stone-500 focus:border-[#c5a059] outline-none"
                        />

                        <div className="grid grid-cols-3 gap-2">
                          <input 
                            type="text" 
                            placeholder="MM/AA" 
                            maxLength="5"
                            value={cardData.exp}
                            onChange={(e) => setCardData({...cardData, exp: e.target.value})}
                            className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2 text-xs text-white text-center font-mono"
                          />
                          <input 
                            type="password" 
                            placeholder="CVC" 
                            maxLength="4"
                            value={cardData.cvc}
                            onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
                            className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2 text-xs text-white text-center font-mono"
                          />
                          <select 
                            value={cardData.installments}
                            onChange={(e) => setCardData({...cardData, installments: e.target.value})}
                            className="w-full bg-[#102a1e] border border-[#234834] rounded-lg p-2 text-xs text-white"
                          >
                            <option value="1">1 Cuota</option>
                            <option value="3">3 Cuotas</option>
                            <option value="6">6 Cuotas</option>
                            <option value="12">12 Cuotas</option>
                            <option value="24">24 Cuotas</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* OPCIÓN 4: WOMPI / MERCADO PAGO / BOLD */}
                    {paymentMethod === 'wompi' && (
                      <div className="text-center py-3 space-y-2">
                        <div className="w-12 h-12 bg-[#2b6cb0]/20 text-[#2b6cb0] rounded-full flex items-center justify-center mx-auto">
                          <Lock className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-stone-200 font-medium">Conexión Directa con Pasarela Bold / Wompi</p>
                        <p className="text-[11px] text-stone-400">
                          Serás redirigido a la ventana segura de pago para completar la transacción de forma inmediata.
                        </p>
                      </div>
                    )}

                    {/* OPCIÓN 5: PAGO CONTRA ENTREGA */}
                    {paymentMethod === 'cod' && (
                      <div className="space-y-2 text-xs text-stone-300">
                        <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200">
                          <p className="font-bold">💵 Pago en Efectivo al Recibir</p>
                          <p className="text-[11px] mt-1">Pagas al mensajero de la transportadora (Servientrega / Interrapidísimo / Coordinadora) cuando tu paquete llegue a tu domicilio.</p>
                        </div>
                        <p className="text-[11px] text-stone-400">* Aplica recargo de transporte por manejo de recaudo nacional: +{formatCOP(12000)}</p>
                      </div>
                    )}

                  </div>
                </div>

              </form>
            )}

            {/* VISTA 3: PEDIDO CONFIRMADO CON ÉXITO */}
            {checkoutStep === 'success' && completedOrder && (
              <div className="p-6 flex-1 overflow-y-auto space-y-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-mono bg-[#163526] text-[#c5a059] px-3 py-1 rounded-full border border-[#2e5e45]">
                    Orden ID: {completedOrder.id}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-2">¡Gracias por tu Compra!</h3>
                  <p className="text-xs text-stone-300 mt-1">Tu pedido en NORTHON ha sido procesado con éxito.</p>
                </div>

                {/* Resumen del Recibo */}
                <div className="bg-[#0d2218] border border-[#1f3f2f] rounded-2xl p-4 text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#1f3f2f] pb-2">
                    <span className="text-stone-400">Fecha:</span>
                    <span className="text-stone-200 font-mono">{completedOrder.date}</span>
                  </div>

                  <div className="flex justify-between border-b border-[#1f3f2f] pb-2">
                    <span className="text-stone-400">Cliente:</span>
                    <span className="text-stone-200 font-bold">{completedOrder.customer.name}</span>
                  </div>

                  <div className="flex justify-between border-b border-[#1f3f2f] pb-2">
                    <span className="text-stone-400">Destino:</span>
                    <span className="text-stone-200">{completedOrder.customer.address}, {completedOrder.customer.city}</span>
                  </div>

                  <div className="flex justify-between border-b border-[#1f3f2f] pb-2">
                    <span className="text-stone-400">Método de Pago:</span>
                    <span className="text-[#c5a059] font-bold uppercase">{completedOrder.method}</span>
                  </div>

                  <div className="pt-2 space-y-1">
                    <span className="text-stone-400 block font-bold mb-1">Productos:</span>
                    {completedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-stone-300 text-[11px]">
                        <span>{it.quantity}x {it.product.title} ({it.size}/{it.color.name})</span>
                        <span className="font-mono">{formatCOP(it.product.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#1f3f2f] pt-2 flex justify-between font-bold text-sm text-white">
                    <span>Total Pagado:</span>
                    <span className="text-emerald-400 font-mono">{formatCOP(completedOrder.total)}</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="space-y-2 pt-2">
                  <button 
                    onClick={() => window.print()}
                    className="w-full bg-[#163526] hover:bg-[#214a36] text-stone-200 border border-[#2e5e45] py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar Factura / Comprobante
                  </button>

                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep('cart');
                    }}
                    className="w-full bg-[#c5a059] text-stone-950 py-2.5 rounded-xl text-xs font-bold transition-all"
                  >
                    Volver a la Tienda
                  </button>
                </div>
              </div>
            )}

            {/* FOOTER DEL DRAWER CON BOTONES DE NAVEGACIÓN */}
            {checkoutStep !== 'success' && cart.length > 0 && (
              <div className="p-5 bg-[#0d2218] border-t border-[#1f3f2f] space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-400">Total a pagar:</span>
                  <span className="text-xl font-bold text-white font-mono">{formatCOP(cartTotal)}</span>
                </div>

                {checkoutStep === 'cart' ? (
                  <button 
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full bg-gradient-to-r from-[#c5a059] to-[#9e7d3b] hover:from-[#d4af37] text-stone-950 font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Ir a Pagar Directo
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="w-1/3 bg-[#102a1e] border border-[#234834] text-stone-300 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" /> Atrás
                    </button>

                    <button 
                      type="submit" 
                      form="payment-form"
                      disabled={isProcessingPayment}
                      className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      {isProcessingPayment ? (
                        <span>Procesando pago...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pagar {formatCOP(cartTotal)}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}