import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, unique: true, nullable: true })
  secondaryEmail?: string | undefined | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  profileImg?: string | undefined | null;

  @Column({ length: 50 })
  fullName: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: "varchar", length: 15, nullable: true })
  secondaryPhone?: string | undefined | null;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
