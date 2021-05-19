import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("fooddata", { schema: "food-diary-db" })
export class Fooddata {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "Food", nullable: true, length: 45 })
  food: string | null;

  @Column("varchar", { name: "MainGroup", nullable: true, length: 10 })
  mainGroup: string | null;

  @Column("varchar", { name: "Group", nullable: true, length: 25 })
  group: string | null;
}

export default Fooddata;
