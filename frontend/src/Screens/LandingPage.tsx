import TabNavigator from '../Components/TabNavigator';
import Hero from '../Components/Hero';


export default function LandingPage() {
  return (
    <div className="relative">
      <TabNavigator />

      <div className="pt-16">
        <Hero />
      </div>
    </div>
  );
}