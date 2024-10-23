import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('event')
@ObjectType()
export class Event {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int, { description: 'ID of the event' })
    id: number;

    @Column()
    @Field(() => String, { description: 'Title of the event' })
    title: string;

    @Column()
    @Field(() => String, { description: 'Description of the event' })
    description: string;

    @Column({ type: 'timestamptz' })
    @Field(() => String, { description: 'Start date of the event' })
    startDate: Date;

    @Column({ type: 'timestamptz' })
    @Field(() => String, { description: 'End date of the event' })
    endDate: Date;

    @ManyToOne(() => Location, (location) => location.events, {
        nullable: true,
    })
    @JoinColumn({ name: 'location_id' })
    @Field(() => Location, { nullable: true })
    location: Location;

    @ManyToOne(() => User, (user) => user.events, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    @Field(() => User)
    user: User;

    @CreateDateColumn({ type: 'timestamptz' })
    @Field(() => String, { description: 'Event creation date' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    @Field(() => String, { description: 'Event update date' })
    updatedAt: Date;
}
