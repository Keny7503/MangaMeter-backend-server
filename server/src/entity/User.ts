import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Manga } from "./Manga"
import { Rating } from "./Rating"

// User entity
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 255 })
    Name: string

    // Many-to-many relationship with Manga (favorites)
    @ManyToMany(() => Manga, manga => manga.users)
    favoriteMangas: Manga[]

    // One-to-many relationship with Rating
    @OneToMany(() => Rating, rating => rating.user)
    ratings: Rating[]
}