import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm"
import { Manga } from "./Manga"

// Genre entity
@Entity()
export class Genre {
    @PrimaryColumn()
    id: string

    @Column()
    Name: string

    // Many-to-many relationship with Manga
    @ManyToMany(() => Manga, manga => manga.genres)
    manga: Manga[]
}