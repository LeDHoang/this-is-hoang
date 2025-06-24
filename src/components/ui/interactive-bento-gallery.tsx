"use client"
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';
import type { PanInfo } from 'framer-motion';

// MediaItemType defines the structure of a media item
interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}

// Optimized MediaItem component with memoization to prevent unnecessary re-renders
const MediaItem = React.memo(({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    // Optimize intersection observer to reduce layout shifts
    useEffect(() => {
        const options = { 
            root: null, 
            rootMargin: '100px', // Increased rootMargin for better prefetching
            threshold: 0.1 
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setIsInView(entry.isIntersecting));
        }, options);
        
        const currentRef = videoRef.current;
        if (currentRef) observer.observe(currentRef);
        
        return () => { 
            if (currentRef) observer.unobserve(currentRef); 
        };
    }, []);

    const handleVideoPlay = useCallback(async () => {
        const video = videoRef.current;
        if (!video || !isInView) return;
        
        try {
            if (video.readyState >= 3) {
                setIsBuffering(false);
                await video.play();
            } else {
                setIsBuffering(true);
                await new Promise((resolve) => {
                    video.oncanplay = resolve;
                });
                setIsBuffering(false);
                await video.play();
            }
        } catch (error) {
            console.warn("Video playback failed:", error);
        }
    }, [isInView]);

    useEffect(() => {
        if (isInView && item.type === 'video') {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isInView, item.type, handleVideoPlay]);

    // Optimize video loading to prevent layout shifts
    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`} style={{ minHeight: '60px' }}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="metadata" // Changed from "auto" to reduce bandwidth
                    style={{ 
                        opacity: isBuffering ? 0.8 : 1, 
                        transition: 'opacity 0.2s ease-in-out',
                        transform: 'translateZ(0)',
                        willChange: isInView ? 'transform' : 'auto' // Optimize will-change
                    }}
                    onLoadedData={() => setIsLoaded(true)}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && !isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url}
            alt={item.title}
            className={`${className} object-cover cursor-pointer`}
            onClick={onClick}
            loading="lazy"
            decoding="async"
            style={{ minHeight: '60px' }} // Prevent layout shift
            onLoad={() => setIsLoaded(true)}
        />
    );
});

MediaItem.displayName = 'MediaItem';

// Optimized GalleryModal with reduced motion for better performance
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
}

const GalleryModal = React.memo(({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });
    
    const handleDragEnd = useCallback((_: any, info: PanInfo) => {
        setDockPosition(prev => ({ 
            x: prev.x + info.offset.x, 
            y: prev.y + info.offset.y 
        }));
    }, []);

    const handleItemClick = useCallback((e: React.MouseEvent, item: MediaItemType) => {
        e.stopPropagation();
        setSelectedItem(item);
    }, [setSelectedItem]);

    if (!isOpen) return null;

    return (
        <>
            <motion.div 
                initial={{ scale: 0.98, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.98, opacity: 0 }} 
                transition={{ type: "spring", stiffness: 400, damping: 30 }} 
                className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[600px] backdrop-blur-lg rounded-none sm:rounded-lg md:rounded-xl overflow-hidden z-10"
            >
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-gray-50/50">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={selectedItem.id} 
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-3xl h-auto max-h-[70vh] rounded-lg overflow-hidden shadow-md" 
                                initial={{ y: 20, scale: 0.97 }} 
                                animate={{ y: 0, scale: 1 }} 
                                exit={{ y: 20, scale: 0.97 }} 
                                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                                onClick={onClose}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain bg-gray-900/20" onClick={onClose} />
                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/50 to-transparent">
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">{selectedItem.title}</h3>
                                    <p className="text-white/80 text-xs sm:text-sm mt-1">{selectedItem.desc}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <motion.button 
                    className="absolute top-2 sm:top-2.5 md:top-3 right-2 sm:right-2.5 md:right-3 p-2 rounded-full bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 text-xs sm:text-sm backdrop-blur-sm" 
                    onClick={onClose} 
                    whileHover={{ scale: 1.05 }} // Reduced scale for better performance
                    whileTap={{ scale: 0.95 }}
                >
                    <X className='w-3 h-3' />
                </motion.button>
            </motion.div>
            <motion.div 
                drag 
                dragMomentum={false} 
                dragElastic={0.1} 
                initial={false} 
                animate={{ x: dockPosition.x, y: dockPosition.y }} 
                onDragEnd={handleDragEnd}
                className="fixed z-50 left-1/2 bottom-4 -translate-x-1/2 touch-none"
            >
                <motion.div className="relative rounded-xl bg-sky-400/20 backdrop-blur-xl border border-blue-400/30 shadow-lg cursor-grab active:cursor-grabbing">
                    <div className="flex items-center -space-x-2 px-3 py-2">
                        {mediaItems.map((item, index) => (
                            <motion.div 
                                key={item.id} 
                                onClick={(e: React.MouseEvent) => handleItemClick(e, item)}
                                style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }} 
                                className={`relative group w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:z-20 ${selectedItem.id === item.id ? 'ring-2 ring-white/70 shadow-lg' : 'hover:ring-2 hover:ring-white/30'}`} 
                                initial={{ rotate: index % 2 === 0 ? -15 : 15 }} 
                                animate={{ 
                                    scale: selectedItem.id === item.id ? 1.1 : 1, // Reduced scale 
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -15 : 15, 
                                    y: selectedItem.id === item.id ? -4 : 0 // Reduced movement
                                }} 
                                whileHover={{ 
                                    scale: 1.15, // Reduced scale
                                    rotate: 0, 
                                    y: -6, // Reduced movement
                                    transition: { type: "spring", stiffness: 400, damping: 25 } 
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                                {selectedItem.id === item.id && (
                                    <motion.div 
                                        layoutId="activeGlow" 
                                        className="absolute -inset-2 bg-white/20 blur-xl" 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        transition={{ duration: 0.2 }} 
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
});

GalleryModal.displayName = 'GalleryModal';

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    // Memoize expensive calculations
    const gridVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.05 } // Reduced stagger for faster loading
        }
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { y: 20, scale: 0.95, opacity: 0 }, // Reduced movement
        visible: { 
            y: 0, 
            scale: 1, 
            opacity: 1, 
            transition: { type: "spring", stiffness: 350, damping: 25 } 
        }
    }), []);

    const handleItemClick = useCallback((item: MediaItemType) => {
        if (!isDragging) {
            setSelectedItem(item);
        }
    }, [isDragging]);

    const handleDragStart = useCallback(() => {
        setIsDragging(true);
    }, []);

    const handleDragEnd = useCallback((e: any, info: PanInfo, index: number) => {
        setIsDragging(false);
        const moveDistance = Math.abs(info.offset.x) + Math.abs(info.offset.y);
        
        if (moveDistance > 50) {
            const newItems = [...items];
            const draggedItem = newItems[index];
            const targetIndex = info.offset.x > 0 ? 
                Math.min(index + 1, items.length - 1) : 
                Math.max(index - 1, 0);
            
            newItems.splice(index, 1);
            newItems.splice(targetIndex, 0, draggedItem);
            setItems(newItems);
        }
    }, [items]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 text-center">
                <motion.h1 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary" 
                    initial={{ opacity: 0, y: 10 }} // Reduced movement
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3 }} // Faster animation
                >
                    {title}
                </motion.h1>
                <motion.p 
                    className="mt-2 text-sm sm:text-base text-secondary/80" 
                    initial={{ opacity: 0, y: 10 }} // Reduced movement
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3, delay: 0.1 }} // Faster animation
                >
                    {description}
                </motion.p>
            </div>
            
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal 
                        selectedItem={selectedItem} 
                        isOpen={true} 
                        onClose={() => setSelectedItem(null)} 
                        setSelectedItem={setSelectedItem} 
                        mediaItems={items} 
                    />
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]" 
                        initial="hidden" 
                        animate="visible" 
                        exit="hidden" 
                        variants={gridVariants}
                        style={{ minHeight: '240px' }} // Prevent layout shift
                    >
                        {items.map((item, index) => (
                            <motion.div 
                                key={item.id} 
                                layoutId={`media-${item.id}`} 
                                className={`relative overflow-hidden rounded-xl cursor-move ${item.span}`} 
                                onClick={() => handleItemClick(item)}
                                variants={itemVariants} 
                                whileHover={{ scale: 1.01 }} // Reduced scale
                                drag 
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
                                dragElastic={0.8} // Reduced elastic
                                onDragStart={handleDragStart}
                                onDragEnd={(e: any, info: PanInfo) => handleDragEnd(e, info, index)}
                                style={{ minHeight: '60px' }} // Prevent layout shift
                            >
                                <MediaItem 
                                    item={item} 
                                    className="absolute inset-0 w-full h-full" 
                                    onClick={() => handleItemClick(item)} 
                                />
                                <motion.div 
                                    className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4" 
                                    initial={{ opacity: 0 }} 
                                    whileHover={{ opacity: 1 }} 
                                    transition={{ duration: 0.15 }} // Faster transition
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">{item.title}</h3>
                                    <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">{item.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default React.memo(InteractiveBentoGallery); 