"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SlideData {
    id: string;
    title: string;
    orderIndex: number;
}

interface SortableSlideItemProps {
    slide: SlideData;
    index: number;
    onEdit: (id: string) => void;
    onDelete?: (id: string) => void;
    isSelected?: boolean;
}

function SortableSlideItem({ slide, index, onEdit, onDelete, isSelected }: SortableSlideItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: slide.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const displayIndex = String(index + 1).padStart(2, '0');

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-3 p-4 border rounded-lg mb-2 transition-colors ${isSelected ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10"
                }`}
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab hover:text-white text-white/50 active:cursor-grabbing shrink-0"
            >
                <GripVertical size={20} />
            </div>
            <div className="text-white/40 font-mono text-sm shrink-0 w-6">
                {displayIndex}
            </div>
            <div className="flex-1 font-medium truncate">{slide.title}</div>
            <div className="flex shrink-0 gap-2">
                <button
                    onClick={() => onEdit(slide.id)}
                    className="px-3 py-1.5 text-sm bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 rounded-md transition-colors"
                >
                    Edit
                </button>
                {onDelete && (
                    <button
                        onClick={() => onDelete(slide.id)}
                        className="px-3 py-1.5 text-sm bg-red-500/20 text-red-300 hover:bg-red-500/40 rounded-md transition-colors"
                    >
                        Trash
                    </button>
                )}
            </div>
        </div>
    );
}

interface SortableListProps {
    items: SlideData[];
    onReorder: (items: SlideData[]) => void;
    onEdit: (id: string) => void;
    onDelete?: (id: string) => void;
    selectedId?: string | null;
}

export default function SortableList({ items, onReorder, onEdit, onDelete, selectedId }: SortableListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((i) => i.id === active.id);
            const newIndex = items.findIndex((i) => i.id === over.id);
            const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
                ...item,
                orderIndex: index,
            }));
            onReorder(newItems);
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                <div className="w-full">
                    {items.map((slide, index) => (
                        <SortableSlideItem
                            key={slide.id}
                            slide={slide}
                            index={index}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isSelected={selectedId === slide.id}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

