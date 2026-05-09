/*
 * Copyright (c) 2026 SoftwarEnTalla
 * Licencia: MIT
 * Contacto: softwarentalla@gmail.com
 * CEOs: 
 *       Persy Morell Guerra      Email: pmorellpersi@gmail.com  Phone : +53-5336-4654 Linkedin: https://www.linkedin.com/in/persy-morell-guerra-288943357/
 *       Dailyn García Domínguez  Email: dailyngd@gmail.com      Phone : +53-5432-0312 Linkedin: https://www.linkedin.com/in/dailyn-dominguez-3150799b/
 *
 * CTO: Persy Morell Guerra
 * COO: Dailyn García Domínguez and Persy Morell Guerra
 * CFO: Dailyn García Domínguez and Persy Morell Guerra
 *
 * Repositories: 
 *               https://github.com/SoftwareEnTalla 
 *
 *               https://github.com/apokaliptolesamale?tab=repositories
 *
 *
 * Social Networks:
 *
 *              https://x.com/SoftwarEnTalla
 *
 *              https://www.facebook.com/profile.php?id=61572625716568
 *
 *              https://www.instagram.com/softwarentalla/
 *              
 *
 *
 */

import { Column, Entity, OneToOne, JoinColumn, ChildEntity, ManyToOne, OneToMany, ManyToMany, JoinTable, Index, Check, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateIntegrationStatusDto, UpdateIntegrationStatusDto, DeleteIntegrationStatusDto } from '../dtos/all-dto';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';
import { plainToInstance } from 'class-transformer';



@ChildEntity('integrationstatus')
@ObjectType()
export class IntegrationStatus extends BaseEntity {
  @ApiProperty({
    type: String,
    nullable: false,
    description: "Nombre de la instancia de IntegrationStatus",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de IntegrationStatus", nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false, comment: 'Este es un campo para nombrar la instancia IntegrationStatus' })
  private name!: string;

  @ApiProperty({
    type: String,
    description: "Descripción de la instancia de IntegrationStatus",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de IntegrationStatus", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false, default: "Sin descripción", comment: 'Este es un campo para describir la instancia IntegrationStatus' })
  private description!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Código del estado',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Código del estado', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, unique: true, comment: 'Código del estado' })
  code!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Nombre visible del estado',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Nombre visible del estado', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 120, comment: 'Nombre visible del estado' })
  displayName!: string;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si el estado es terminal',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si el estado es terminal', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Indica si el estado es terminal' })
  isTerminal!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si el estado permite operación',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si el estado permite operación', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Indica si el estado permite operación' })
  isOperational!: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Severidad asociada al estado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Severidad asociada al estado', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 20, comment: 'Severidad asociada al estado' })
  severity?: string = '';

  protected executeDslLifecycle(): void {
    // No se definieron business-rules en el DSL.
  }

  // Relación con BaseEntity (opcional, si aplica)
  // @OneToOne(() => BaseEntity, { cascade: true })
  // @JoinColumn()
  // base!: BaseEntity;

  constructor() {
    super();
    this.type = 'integrationstatus';
  }

  // Getters y Setters
  get getName(): string {
    return this.name;
  }
  set setName(value: string) {
    this.name = value;
  }
  get getDescription(): string {
    return this.description;
  }

  // Métodos abstractos implementados
  async create(data: any): Promise<BaseEntity> {
    Object.assign(this, data);
    this.executeDslLifecycle();
    this.modificationDate = new Date();
    return this;
  }
  async update(data: any): Promise<BaseEntity> {
    Object.assign(this, data);
    this.executeDslLifecycle();
    this.modificationDate = new Date();
    return this;
  }
  async delete(id: string): Promise<BaseEntity> {
    this.id = id;
    return this;
  }

  // Método estático para convertir DTOs a entidad con sobrecarga
  static fromDto(dto: CreateIntegrationStatusDto): IntegrationStatus;
  static fromDto(dto: UpdateIntegrationStatusDto): IntegrationStatus;
  static fromDto(dto: DeleteIntegrationStatusDto): IntegrationStatus;
  static fromDto(dto: any): IntegrationStatus {
    // plainToInstance soporta todos los DTOs
    return plainToInstance(IntegrationStatus, dto);
  }
}
