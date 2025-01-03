# React-Native-Yelp-Clone

Bu proje, **React Native** kullanılarak oluşturulmuş bir Yelp klonudur. Uygulama, restoran ve işletme verilerini [Yelp API](https://docs.developer.yelp.com/reference/v3_business_search/) üzerinden alarak kullanıcıya sunar. Yelp'in temel özelliklerini taklit eden bu uygulama, kullanıcı dostu bir arayüz içermektedir.

## Teknolojiler ve Kütüphaneler

- **React**
- **React Native**
- **Expo**
- **React Navigation**
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/stack`
- **Axios**
- **Dotenv**
- **React Native Gesture Handler**
- **React Native Reanimated**
- **React Native Safe Area Context**
- **React Native Screens**
- **Expo Vector Icons**

## Özellikler

- **Restoran ve İşletme Listesi**: Yelp API üzerinden işletme bilgileri alma ve listeleme.
- **Detaylı İşletme Bilgisi**: Her işletme için detaylı bilgilere erişim.
- **Arama Özelliği**: Farklı lokasyonlar ve kategorilerde işletme arama.

## Kurulum

1. **Depoyu klonlayın:**

- git clone <https://github.com/mucahitcetin/React-Native-Yelp-Clone.git>
- cd react-native-yelp-clone

2. **Gerekli bağımlılıkları yükleyin:**

- npm install

3. **Yelp API Anahtarınızı ekleyin:**

- kök dizinde .env dosyası oluşturun ve EXPO_PUBLIC_YELP_API_KEY: şeklinde anahtarınızı ekleyin. (tırnaksız ve boşluksuz)
- isteği attığınız yere {process.env.EXPO_PUBLIC_YELP_API_KEY} şeklinde ekleyin

4. **Uygulamayı çalıştırın:**

- npx expo start

## Ekran Görüntüsü

![](ekran.gif)
