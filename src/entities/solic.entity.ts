import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('solicitudes_visita')
export class SolicitudVisita {
  @PrimaryGeneratedColumn()
  solicitud_id: number;

  @Column()
  visitante_id: number;

  @Column()
  residente_id: number;

  @Column()
  manzana: string;

  @Column()
  villa: string;

  @Column({ type: 'date' })
  fecha_visita: Date;

  @Column({ type: 'time' })
  hora_visita: string;

  @Column({ type: 'enum', enum: ['vehículo', 'caminando'] })
  medio_ingreso: string;

  @Column({ nullable: true })
  foto_placa: string;

  @Column({
    type: 'enum',
    enum: ['ingresada', 'aprobada', 'rechazada'],
    default: 'ingresada',
  })
  estado: string;

  @CreateDateColumn()
  creado_en: Date;

  @UpdateDateColumn()
  actualizado_en: Date;
}
