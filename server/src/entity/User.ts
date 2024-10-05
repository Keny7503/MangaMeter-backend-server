import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm"
import { Manga } from "./Manga"
import { Rating } from "./Rating"

// User entity
@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    Name: string

    // Many-to-many relationship with Manga (favorites)
    @ManyToMany(() => Manga, manga => manga.users)
    favoriteManga: Manga[]

    // One-to-many relationship with Rating
    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[]
}