import { IStats } from "./types"; // Assurez-vous que le chemin est correct

const dataMapping: {
  [key: string]: () => Promise<{ data: IStats[] }>; // Signature d'index
} = {
  Louann: () => import('./data/louann').then(module => module), // Assurez-vous que le module exporte un objet avec une propriété 'data'
  carla: () => import('./data/carla'),
  // mp: () => import('./data/mp'),
  // lulu: () => import('./data/lulu'),
  // ines: () => import('./data/ines'),
  // inespro: () => import('./data/inespro'),
  // louannpro: () => import('./data/louannpro'),
  // johannes: () => import('./data/johannes'),
  // lena: () => import('./data/lena'),
};

export default dataMapping;



// const dataMapping: {
//   [key: string]: () => Promise<{ data: IStats[] }>; // Signature d'index
// } = {
// //     louann: () => import('data/louann').then(mod => mod.data),
// //     carla: () => import('data/carla').then(mod => mod.data),
// //     mp: () => import('data/mp').then(mod => mod.data),
// //     lulu: () => import('data/lulu').then(mod => mod.data),
// //     ines: () => import('data/ines').then(mod => mod.data),
// //     inespro: () => import('data/inespro').then(mod => mod.data),
// //     louannpro: () => import('data/louannpro').then(mod => mod.data),
// //     johannes: () => import('data/johannes').then(mod => mod.data),
// //     lena: () => import('data/lena').then(mod => mod.data),
// //   };
  
// //   export default dataMapping;
  