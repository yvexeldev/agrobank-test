import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from 'src/modules/event/entities/event.entity';

@Entity('location')
@ObjectType()
export class Location {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int, { description: 'ID of the location' })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    @Field(() => String, { description: 'Title of the location' })
    title: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: 'Longitude of the location' })
    longitude: string;

    @Column({ type: 'text' })
    @Field(() => String, { description: 'Latitude of the location' })
    latitude: string;

    @OneToMany(() => Event, (event) => event.location)
    @Field(() => [Event], { nullable: true })
    events: Event[];
}
