import TabNavigator from '../Components/TabNavigator';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';
import Section1 from '../Components/Principal/Section1';
import Section2 from '../Components/Principal/Section2';
import Section3 from '../Components/Principal/Section3';


export default function LandingPage() {
  return (
    <div className="relative">
      <TabNavigator />

      <div className="pt-16">
        <Hero />
        <Section1 />
        <Section2 /> 
        <Section3 /> 
        <Footer />  
      </div>
    </div>
  );
}