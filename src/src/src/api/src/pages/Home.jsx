import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import EquipmentCard from "../components/store/EquipmentCard";
import QuoteModal from "../components/store/QuoteModal";
import SalesAssistant from "../components/store/SalesAssistant";
import SocialMediaBox from "../components/store/SocialMediaBox";
import BrandBanner from "../components/store/BrandBanner";
import EditableBanner from "../components/home/EditableBanner";
import WorkWithUs from "../components/home/WorkWithUs";
import CategoryFilterIcons from "../components/store/CategoryFilterIcons";
import ImagePreviewModal from "../components/store/ImagePreviewModal";
import EquipmentDetailModal from "../components/store/EquipmentDetailModal";
import VideoPromotion from "../components/home/VideoPromotion";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [equipmentForAction, setEquipmentForAction] = useState(null);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [previewImages, setPreviewImages] = useState([]);
  const [previewStartIndex, setPreviewStartIndex] = useState(0);

  const { data: equipment, isLoading: isLoadingEquipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: () => base44.entities.Equipment.list("-created_date"),
    initialData: []
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => base44.entities.Category.list(),
    initialData: []
  });

  const handleQuote = (eq) => {
    setEquipmentForAction(eq);
    setIsQuoteModalOpen(true);
  };

  const handleImagePreview = (images, startIndex = 0) => {
    setPreviewImages(images);
    setPreviewStartIndex(startIndex);
    setIsImagePreviewOpen(true);
  };

  const handleViewDetails = (eq) => {
    setEquipmentForAction(eq);
    setIsDetailModalOpen(true);
  };

  const filteredEquipment = equipment.filter((eq) => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || eq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredEquipment = filteredEquipment.filter((eq) => eq.is_featured);
  const regularEquipment = filteredEquipment.filter((eq) => !eq.is_featured);

  const isLoading = isLoadingEquipment || isLoadingCategories;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 60, 113, 0.7), rgba(0, 133, 202, 0.7)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop')`
        }}>

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2888b73e9da7ec3ce0573/e602b2170_LOGOBLANCO.png"
              alt="IntiMed"
              className="h-20 mb-6" />

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Equipos Biomédicos de <br className="hidden md:block" /><span className="text-[#F9B233]">Última Generación</span>
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Soluciones integrales en tecnología médica para instituciones de salud. 
              Calidad certificada y soporte técnico especializado.
            </p>
          </div>
        </div>
      </div>
      
      <VideoPromotion />
      
      <EditableBanner />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="mb-12 space-y-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} className="bg-background pr-3 pl-3 text-base font-medium rounded-full flex w-full border ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-14 border-slate-200 focus:border-[#0085CA] shadow-sm" />


          </div>
          
          <CategoryFilterIcons
            categories={categories}
            activeCategory={categoryFilter}
            onCategoryChange={setCategoryFilter}
            isLoading={isLoadingCategories} />

        </div>

        {/* Featured Equipment */}
        {featuredEquipment.length > 0 &&
        <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-6 h-6 text-[#F9B233]" fill="#F9B233" />
              <h2 className="text-3xl font-bold text-[#003C71]">Equipos Destacados</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ?
            Array(3).fill(0).map((_, i) =>
            <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
            ) :

            featuredEquipment.map((eq) =>
            <EquipmentCard key={eq.id} equipment={eq} onQuote={handleQuote} onImagePreview={handleImagePreview} onViewDetails={handleViewDetails} />
            )
            }
            </div>
          </div>
        }

        {/* Regular Equipment */}
        {regularEquipment.length > 0 &&
        <div>
            <h2 className="text-3xl font-bold text-[#003C71] mb-8">Catálogo Completo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ?
            Array(6).fill(0).map((_, i) =>
            <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
            ) :

            regularEquipment.map((eq) =>
            <EquipmentCard key={eq.id} equipment={eq} onQuote={handleQuote} onImagePreview={handleImagePreview} onViewDetails={handleViewDetails} />
            )
            }
            </div>
          </div>
        }
        
        {filteredEquipment.length === 0 && !isLoading &&
        <div className="text-center py-16">
            <p className="text-slate-500 text-lg font-medium">No se encontraron equipos con los filtros seleccionados.</p>
          </div>
        }
      </div>

      <div className="px-6 py-5">
        <SocialMediaBox />
      </div>

      <WorkWithUs />

      <div className="pb-12">
        <BrandBanner />
      </div>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        equipment={equipmentForAction} />

      
      <ImagePreviewModal
        isOpen={isImagePreviewOpen}
        onClose={() => setIsImagePreviewOpen(false)}
        images={previewImages}
        startIndex={previewStartIndex} />

      
      <EquipmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        equipment={equipmentForAction}
        onQuote={handleQuote} />


      <SalesAssistant />
    </div>);
}
