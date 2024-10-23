import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Event } from 'src/event/entities/event.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('user')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('increment')
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @OneToMany(() => Event, (event) => event.user)
    @Field(() => [Event], { nullable: true })
    events: Event[];

    @CreateDateColumn({ type: 'timestamptz' })
    @Field(() => String)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    @Field(() => String)
    updatedAt: Date;

    @Column({ default: false })
    @Field(() => Boolean)
    verified: boolean;
}
