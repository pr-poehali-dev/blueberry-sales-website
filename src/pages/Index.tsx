import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const products = [
    {
      id: 1,
      name: 'Голубика свежая',
      description: 'Свежесобранная голубика высшего сорта',
      price: '450 ₽',
      weight: '500 г',
      image: 'https://cdn.poehali.dev/projects/52fa835e-77d0-4902-8aa9-75354110808c/files/a611349d-f4eb-4de5-87dc-30170118abdf.jpg'
    },
    {
      id: 2,
      name: 'Голубика крупная',
      description: 'Отборные крупные ягоды для особых случаев',
      price: '550 ₽',
      weight: '500 г',
      image: 'https://cdn.poehali.dev/projects/52fa835e-77d0-4902-8aa9-75354110808c/files/a611349d-f4eb-4de5-87dc-30170118abdf.jpg'
    },
    {
      id: 3,
      name: 'Голубика органическая',
      description: 'Выращена без химикатов и удобрений',
      price: '600 ₽',
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
            <Button variant="secondary" size="sm">
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Корзина
            </Button>
          </div>
        </div>
      </nav>

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
                          <p className="text-3xl font-bold text-accent">{product.price}</p>
                          <p className="text-sm text-muted-foreground">{product.weight}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90">
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
                    <label className="block text-sm font-medium mb-2">Ваше имя</label>
                    <Input placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Телефон</label>
                    <Input placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="ivan@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea placeholder="Расскажите, что вас интересует..." rows={4} />
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
