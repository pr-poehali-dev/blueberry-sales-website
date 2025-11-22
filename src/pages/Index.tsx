import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('courier');
  const { toast } = useToast();

  const products: Product[] = [
    {
      id: 1,
      name: 'Голубика свежая',
      description: 'Свежесобранная голубика высшего сорта',
      price: 450,
      weight: '500 г',
      image: 'https://cdn.poehali.dev/projects/52fa835e-77d0-4902-8aa9-75354110808c/files/a611349d-f4eb-4de5-87dc-30170118abdf.jpg'
    },
    {
      id: 2,
      name: 'Голубика крупная',
      description: 'Отборные крупные ягоды для особых случаев',
      price: 550,
      weight: '500 г',
      image: 'https://cdn.poehali.dev/projects/52fa835e-77d0-4902-8aa9-75354110808c/files/a611349d-f4eb-4de5-87dc-30170118abdf.jpg'
    },
    {
      id: 3,
      name: 'Голубика органическая',
      description: 'Выращена без химикатов и удобрений',
      price: 600,
      weight: '500 г',
      image: 'https://cdn.poehali.dev/projects/52fa835e-77d0-4902-8aa9-75354110808c/files/a611349d-f4eb-4de5-87dc-30170118abdf.jpg'
    }
  ];

  const benefits = [
    {
      icon: 'Leaf',
      title: 'Органическое выращивание',
      description: 'Без химикатов и пестицидов'
    },
    {
      icon: 'Heart',
      title: 'Полезно для здоровья',
      description: 'Богата антиоксидантами и витаминами'
    },
    {
      icon: 'Truck',
      title: 'Быстрая доставка',
      description: 'Доставим свежие ягоды в день сбора'
    },
    {
      icon: 'Award',
      title: 'Лучшее качество',
      description: 'Строгий контроль на всех этапах'
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: 'Добавлено в корзину',
      description: `${product.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getDeliveryPrice = () => {
    if (deliveryType === 'pickup') return 0;
    if (deliveryType === 'courier') return 300;
    if (deliveryType === 'express') return 500;
    return 0;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заказ оформлен!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Grape" size={32} />
              <span className="text-2xl font-bold">Ферма Голубики</span>
            </div>
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className="hover:text-accent transition-colors"
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className="hover:text-accent transition-colors"
              >
                О ферме
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className="hover:text-accent transition-colors"
              >
                Контакты
              </button>
            </div>
            
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm" className="relative">
                  <Icon name="ShoppingCart" size={18} className="mr-2" />
                  Корзина
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Корзина пуста' : `${getTotalItems()} товаров`}
                  </SheetDescription>
                </SheetHeader>
                
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <Icon name="ShoppingCart" size={64} className="mb-4 opacity-20" />
                    <p>Корзина пуста</p>
                  </div>
                ) : (
                  <div className="mt-8 space-y-4">
                    {cart.map(item => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.weight}</p>
                              <p className="text-lg font-bold text-accent mt-1">{item.price} ₽</p>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-lg">
                        <span>Товары:</span>
                        <span className="font-semibold">{getTotalPrice()} ₽</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span className="text-accent">{getTotalPrice()} ₽</span>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                      }}
                    >
                      <Icon name="CreditCard" size={18} className="mr-2" />
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Оформление заказа</SheetTitle>
            <SheetDescription>
              Заполните форму для оформления заказа
            </SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleCheckout} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input id="name" placeholder="Иван Иванов" required />
              </div>
              
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="ivan@example.com" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Способ доставки *</Label>
              <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="courier" id="courier" />
                  <Label htmlFor="courier" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Курьерская доставка</p>
                        <p className="text-sm text-muted-foreground">1-2 дня</p>
                      </div>
                      <span className="font-semibold">300 ₽</span>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Экспресс-доставка</p>
                        <p className="text-sm text-muted-foreground">В день заказа</p>
                      </div>
                      <span className="font-semibold">500 ₽</span>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Самовывоз</p>
                        <p className="text-sm text-muted-foreground">С фермы</p>
                      </div>
                      <span className="font-semibold text-green-600">Бесплатно</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {deliveryType !== 'pickup' && (
              <div>
                <Label htmlFor="address">Адрес доставки *</Label>
                <Textarea
                  id="address"
                  placeholder="Укажите полный адрес доставки"
                  rows={3}
                  required
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea
                id="comment"
                placeholder="Особые пожелания или уточнения"
                rows={3}
              />
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Товары:</span>
                <span className="font-semibold">{getTotalPrice()} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span className="font-semibold">{getDeliveryPrice()} ₽</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Итого:</span>
                <span className="text-accent">{getTotalPrice() + getDeliveryPrice()} ₽</span>
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
              <Icon name="Check" size={18} className="mr-2" />
              Подтвердить заказ
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      {activeSection === 'home' && (
        <>
          <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://cdn.poehali.dev/projects/52fa835e-77d0-4902-8aa9-75354110808c/files/d1f88a88-df49-46a5-92ae-40e7724152ca.jpg')`,
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10 text-center text-white px-4 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Свежая голубика с нашей фермы</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Натуральная, полезная, выращенная с любовью
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Перейти к покупкам
              </Button>
            </div>
          </section>

          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Наша голубика</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover-scale transition-all">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-accent">{product.price} ₽</p>
                          <p className="text-sm text-muted-foreground">{product.weight}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => addToCart(product)}
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Почему выбирают нас</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-card rounded-lg shadow-sm hover-scale transition-all"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Icon name={benefit.icon} size={32} className="text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'about' && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-fade-in">
              <h1 className="text-5xl font-bold text-center mb-8">О нашей ферме</h1>
              
              <div className="mb-12">
                <img
                  src="https://cdn.poehali.dev/projects/52fa835e-77d0-4902-8aa9-75354110808c/files/d1f88a88-df49-46a5-92ae-40e7724152ca.jpg"
                  alt="Наша ферма"
                  className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
                />
              </div>

              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg leading-relaxed">
                  Наша семейная ферма занимается выращиванием голубики уже более 15 лет. Мы начинали с небольшого участка,
                  а сегодня наши поля простираются на десятки гектаров живописной местности.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6">Наши ценности</h2>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Sprout" size={24} className="text-primary" />
                      Экологичность
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Мы используем только органические методы выращивания. Никаких химических удобрений и пестицидов —
                      только натуральный уход и забота о природе.
                    </p>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Users" size={24} className="text-primary" />
                      Семейное дело
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Наша ферма — это семейное дело, в которое мы вкладываем душу. Каждая ягода собрана с любовью
                      и заботой о вашем здоровье.
                    </p>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Star" size={24} className="text-primary" />
                      Качество
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Мы тщательно контролируем качество на всех этапах — от посадки до сбора урожая.
                      Только лучшие ягоды попадают к нашим покупателям.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contact' && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-fade-in">
              <h1 className="text-5xl font-bold text-center mb-12">Свяжитесь с нами</h1>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MapPin" size={24} className="text-primary" />
                      Адрес
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Московская область, <br />Деревня Ягодное, д. 15</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Phone" size={24} className="text-primary" />
                      Телефон
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>+7 (495) 123-45-67</p>
                    <p className="text-sm text-muted-foreground mt-1">Звоните с 9:00 до 20:00</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Mail" size={24} className="text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>info@ferma-golubiki.ru</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Clock" size={24} className="text-primary" />
                      Режим работы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Пн-Вс: 9:00 - 20:00</p>
                    <p className="text-sm text-muted-foreground mt-1">Без выходных</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Напишите нам</CardTitle>
                  <CardDescription>
                    Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Ваше имя</Label>
                    <Input id="contact-name" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Телефон</Label>
                    <Input id="contact-phone" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="ivan@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea id="contact-message" placeholder="Расскажите, что вас интересует..." rows={4} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-primary text-primary-foreground py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Grape" size={28} />
                <span className="text-xl font-bold">Ферма Голубики</span>
              </div>
              <p className="text-primary-foreground/80">
                Свежая органическая голубика с нашей семейной фермы
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Навигация</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection('home')}
                  className="block hover:text-accent transition-colors"
                >
                  Главная
                </button>
                <button
                  onClick={() => setActiveSection('about')}
                  className="block hover:text-accent transition-colors"
                >
                  О ферме
                </button>
                <button
                  onClick={() => setActiveSection('contact')}
                  className="block hover:text-accent transition-colors"
                >
                  Контакты
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-primary-foreground/80">
                <p>+7 (495) 123-45-67</p>
                <p>info@ferma-golubiki.ru</p>
                <p>Московская область</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Ферма Голубики. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
