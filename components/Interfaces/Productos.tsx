export interface Restaurante {
    slug: string;
    name: string;
    descripcion: string;
    logo: string;
    rating: number;
    food_types: Food_type;
    reviews: Reviews;

}

export interface Food_type {
    food_type: string;
}

export interface Reviews {
    slug: string;
    restaurant: string;
    email: string;
    comments: string;
    rating: number;
    created: string;
}
