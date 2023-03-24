import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Contact } from "./contacts.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, unique: true, nullable: true })
  secondaryEmail?: string | undefined | null;

  @Column({ length: 120 })
  password: string;

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

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
