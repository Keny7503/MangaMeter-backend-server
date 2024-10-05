import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Manga } from "./Manga"
import { User } from "./User"
import { Genre } from "./Genre"

// Rating entity
@Entity()
export class Rating {
    @PrimaryColumn()
    id: string

    @Column()
    RatingScore: number

    // Many-to-one relationship with Manga
    @ManyToOne(() => Manga, manga => manga.ratings)
    @JoinColumn({ name: "MangaID" })
    manga: Manga

    // Many-to-one relationship with User
    @ManyToOne(() => User, user => user.ratings)
    @JoinColumn({ name: "UserID" })
    user: User

    // Many-to-one relationship with Genre (optional, depending on use case)
    @ManyToOne(() => Genre)
    @JoinColumn({ name: "GenreID" })
    genre: Genre
}