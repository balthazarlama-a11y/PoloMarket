import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface HorseProps {
  id: string;
  name: string;
  price: string;
  currency: string;
  image: string;
  location: string;
  age: number;
  height: string; 
  sex: "Mare" | "Gelding" | "Stallion" | "Yegua" | "Castrado" | "Padrillo";
  type: "Venta" | "Arriendo";
  tags?: string[];
}

export function HorseCard({ horse }: { horse: HorseProps }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/marketplace`}>
        <Card className="group overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border-none bg-white">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={horse.image}
              alt={horse.name}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute top-3 right-3">
               <button className="p-2.5 rounded-full bg-white/20 backdrop-blur-md hover:bg-white transition-all text-white hover:text-red-500 shadow-lg">
                 <Heart className="w-4 h-4" />
               </button>
            </div>
            <div className="absolute top-3 left-3">
              <Badge variant={horse.type === "Venta" ? "default" : "secondary"} className="uppercase tracking-widest text-[10px] font-extrabold px-3 py-1 shadow-sm">
                {horse.type}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
                  {horse.name}
                </h3>
                <div className="flex items-center text-muted-foreground text-xs mt-2 gap-1.5 font-medium uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  {horse.location}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/40 my-4">
              <div className="text-center">
                <span className="block text-[10px] uppercase text-muted-foreground tracking-widest mb-1">Edad</span>
                <span className="font-bold text-sm text-primary">{horse.age} años</span>
              </div>
              <div className="text-center border-x border-border/40">
                <span className="block text-[10px] uppercase text-muted-foreground tracking-widest mb-1">Alzada</span>
                <span className="font-bold text-sm text-primary">{horse.height}</span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] uppercase text-muted-foreground tracking-widest mb-1">Sexo</span>
                <span className="font-bold text-sm text-primary">{horse.sex}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
            <div className="font-serif text-2xl font-black text-primary">
              <span className="text-xs font-normal text-muted-foreground mr-1 uppercase">{horse.currency}</span>
              {horse.price}
            </div>
            <div className="flex items-center text-xs font-bold text-secondary uppercase tracking-widest group-hover:translate-x-1 transition-transform">
              Ver ficha <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}