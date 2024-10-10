import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany, ManyToOne, JoinColumn, JoinTable } from "typeorm";
import { Genre } from "./Genre";
import { User } from "./User";
import { Rating } from "./Rating";

// Manga entity
@Entity()
export class Manga {
    @PrimaryColumn('varchar', { length: 255 })
    id: string

    @Column('varchar', { length: 255 })
    Name: string

    // Many-to-many relationship with Genre
    @ManyToMany(() => Genre, genre => genre.mangas)
    @JoinTable({
        name: "MangaGenres", // Join table name for Manga and Genre
        joinColumn: { name: "MangaID", referencedColumnName: "id" },
        inverseJoinColumn: { name: "GenreID", referencedColumnName: "id" }
    })
    genres: Genre[]

    // Many-to-many relationship with User (favorites)
    @ManyToMany(() => User, user => user.favoriteMangas)
    @JoinTable({
        name: "FavoriteList", // Join table for Manga and User favorites
        joinColumn: { name: "MangaID", referencedColumnName: "id" },
        inverseJoinColumn: { name: "UserID", referencedColumnName: "id" }
    })
    users: User[]

    // One-to-many relationship with Rating
    @OneToMany(() => Rating, rating => rating.manga)
    ratings: Rating[]
}