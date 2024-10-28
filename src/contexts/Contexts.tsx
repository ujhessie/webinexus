import { ProjetosProvider } from "./ProjetosContexts";

interface iContexts {
  children: React.ReactNode;
}

const Contexts: React.FC<iContexts> = ({ children }) => {
  return (
    <>
      <ProjetosProvider>{children}</ProjetosProvider>
    </>
  );
};

export default Contexts;