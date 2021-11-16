export interface Restaurante {
    slug: string;
    name: string;
    description: string;
    logo: string;
    rating: number;
    food_type: Food_type;
    reviews: Reviews;

}

export interface Food_type {
    slug: string;
    name: string;
}

export interface Reviews {
    slug: string;
    restaurant: string;
    email: string;
    comments: string;
    rating: number;
    created: string;
}
