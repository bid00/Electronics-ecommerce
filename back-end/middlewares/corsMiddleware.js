import cors from 'cors';

const corsMiddleware = (app) => {
  app.use(
    cors({
      origin:'*' , 
      methods: ["GET", "POST","PATCH","PUT"],
    })
  );
};

export default corsMiddleware;