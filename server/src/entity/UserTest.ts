import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Manga {
    @PrimaryColumn()
    id: string

    @Column()
    Name: string

    @OneToMany(() => GenreList, genreList => genreList.MangaID)
    genreLists: GenreList[]

    @OneToMany(() => FavoriteList, favoriteList => favoriteList.MangaID)
    favoriteLists: FavoriteList[]

    @OneToMany(() => Rating, rating => rating.MangaID)
    ratings: Rating[]
}

@Entity()
export class Genre {
    @PrimaryColumn()
    id: string

    @Column()
    Name: string

    @OneToMany(() => GenreList, genreList => genreList.GenreID)
    genreLists: GenreList[]

    @OneToMany(() => Rating, rating => rating.GenreID)
    ratings: Rating[]
}

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    Name: string

    @OneToMany(() => FavoriteList, favoriteList => favoriteList.UserID)
    favoriteLists: FavoriteList[]

    @OneToMany(() => Rating, rating => rating.UserID)
    ratings: Rating[]
}

@Entity()
export class GenreList {
    @ManyToOne(() => Manga, manga => manga.genreLists)
    @PrimaryColumn()
    MangaID: string

    @ManyToOne(() => Genre, genre => genre.genreLists)
    @PrimaryColumn()
    GenreID: string
}

@Entity()
export class FavoriteList {
    @ManyToOne(() => Manga, manga => manga.favoriteLists)
    @PrimaryColumn()
    MangaID: string

    @ManyToOne(() => User, user => user.favoriteLists)
    @PrimaryColumn()
    UserID: string
}

@Entity()
export class Rating {
    @PrimaryColumn()
    id: string

    @ManyToOne(() => Manga, manga => manga.ratings)
    @JoinColumn({ name: "MangaID" })
    MangaID: string

    @ManyToOne(() => Genre, genre => genre.ratings)
    @JoinColumn({ name: "GenreID" })
    GenreID: string

    @ManyToOne(() => User, user => user.ratings)
    @JoinColumn({ name: "UserID" })
    UserID: string

    @Column()
    RatingScore: number
}
