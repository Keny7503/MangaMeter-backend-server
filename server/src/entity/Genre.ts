import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm"
import { Manga } from "./Manga"

// Genre entity
@Entity()
export class Genre {
    @PrimaryColumn('varchar', { length: 255 })
    id: string

    @Column('varchar', { length: 255 })
    Name: string

    // Many-to-many relationship with Manga
    @ManyToMany(() => Manga, manga => manga.genres)
    mangas: Manga[]
}