import { RouteObject } from 'react-router-dom';
import BrandLayout from '../components/brand/BrandLayout';
import BrandSignUp from '../pages/brand/SignUp';
import BrandHome from '../pages/brand/Home';
import BrandDashboard from '../pages/brand/Dashboard';
import BrandFeatures from '../pages/brand/Features';
import BrandPricing from '../pages/brand/Pricing';
import BrandSupport from '../pages/brand/Support';

export const brandRoutes: RouteObject[] = [
  {
    path: '/',
    element: <BrandLayout />,
    children: [
      { index: true, element: <BrandHome /> },
      { path: 'signup', element: <BrandSignUp /> },
      { path: 'dashboard', element: <BrandDashboard /> },
      { path: 'features', element: <BrandFeatures /> },
      { path: 'pricing', element: <BrandPricing /> },
      { path: 'support', element: <BrandSupport /> }
    ]
  }
];