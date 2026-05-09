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
import { CreateIntegratorDto, UpdateIntegratorDto, DeleteIntegratorDto } from '../dtos/all-dto';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';
import { plainToInstance } from 'class-transformer';


@Index('idx_integrator_code', ['code'], { unique: true })
@Index('idx_integrator_provider_status', ['providerCode', 'status'])
@Unique('uq_integrator_code', ['code'])
@ChildEntity('integrator')
@ObjectType()
export class Integrator extends BaseEntity {
  @ApiProperty({
    type: String,
    nullable: false,
    description: "Nombre de la instancia de Integrator",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de Integrator", nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false, comment: 'Este es un campo para nombrar la instancia Integrator' })
  private name!: string;

  @ApiProperty({
    type: String,
    description: "Descripción de la instancia de Integrator",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de Integrator", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false, default: "Sin descripción", comment: 'Este es un campo para describir la instancia Integrator' })
  private description!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Código único de la integración',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Código único de la integración', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 60, unique: true, comment: 'Código único de la integración' })
  code!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Proveedor o plataforma asociada',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Proveedor o plataforma asociada', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 60, comment: 'Proveedor o plataforma asociada' })
  providerCode!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Categoría funcional de la integración',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Categoría funcional de la integración', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 60, comment: 'Categoría funcional de la integración' })
  category!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Ambiente operativo',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Ambiente operativo', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 30, default: 'PRODUCTION', comment: 'Ambiente operativo' })
  environment!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Esquema de autenticación principal',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Esquema de autenticación principal', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, comment: 'Esquema de autenticación principal' })
  authScheme!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Estado operativo de la integración',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Estado operativo de la integración', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, comment: 'Estado operativo de la integración' })
  status!: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Alias de la credencial activa',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Alias de la credencial activa', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 100, comment: 'Alias de la credencial activa' })
  credentialAlias?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Identificador del endpoint principal',
  })
  @IsUUID()
  @IsOptional()
  @Field(() => String, { description: 'Identificador del endpoint principal', nullable: true })
  @Column({ type: 'uuid', nullable: true, comment: 'Identificador del endpoint principal' })
  primaryEndpointId?: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Equipo responsable de la integración',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Equipo responsable de la integración', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 100, comment: 'Equipo responsable de la integración' })
  ownerTeam?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Propósito funcional y operativo',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Propósito funcional y operativo', nullable: true })
  @Column({ type: 'text', nullable: true, comment: 'Propósito funcional y operativo' })
  purpose?: string = '';

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Permite tráfico entrante hacia el ERP',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Permite tráfico entrante hacia el ERP', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Permite tráfico entrante hacia el ERP' })
  supportsInbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Permite tráfico saliente desde el ERP',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Permite tráfico saliente desde el ERP', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: true, comment: 'Permite tráfico saliente desde el ERP' })
  supportsOutbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Permite callbacks o webhooks',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Permite callbacks o webhooks', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Permite callbacks o webhooks' })
  supportsWebhook!: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Motivo operativo del estado actual',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Motivo operativo del estado actual', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 255, comment: 'Motivo operativo del estado actual' })
  statusReason?: string = '';

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha del último cambio de estado',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha del último cambio de estado', nullable: true })
  @Column({ type: 'timestamp', nullable: true, comment: 'Fecha del último cambio de estado' })
  statusChangedAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha de última validación técnica',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha de última validación técnica', nullable: true })
  @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última validación técnica' })
  lastValidatedAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Próxima fecha prevista de rotación',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Próxima fecha prevista de rotación', nullable: true })
  @Column({ type: 'timestamp', nullable: true, comment: 'Próxima fecha prevista de rotación' })
  nextRotationAt?: Date = new Date();

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales de interoperabilidad',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales de interoperabilidad', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales de interoperabilidad' })
  metadata?: Record<string, any> = {};

  protected executeDslLifecycle(): void {
    // Rule: active-integrator-requires-credential-and-endpoint
    // Una integración activa requiere endpoint principal y alias de credencial.
    if (!(this.status === 'ACTIVE' && !(this.credentialAlias === undefined || this.credentialAlias === null || (typeof this.credentialAlias === 'string' && String(this.credentialAlias).trim() === '') || (Array.isArray(this.credentialAlias) && this.credentialAlias.length === 0) || (typeof this.credentialAlias === 'object' && !Array.isArray(this.credentialAlias) && Object.prototype.toString.call(this.credentialAlias) === '[object Object]' && Object.keys(Object(this.credentialAlias)).length === 0)) && !(this.primaryEndpointId === undefined || this.primaryEndpointId === null || (typeof this.primaryEndpointId === 'string' && String(this.primaryEndpointId).trim() === '') || (Array.isArray(this.primaryEndpointId) && this.primaryEndpointId.length === 0) || (typeof this.primaryEndpointId === 'object' && !Array.isArray(this.primaryEndpointId) && Object.prototype.toString.call(this.primaryEndpointId) === '[object Object]' && Object.keys(Object(this.primaryEndpointId)).length === 0)))) {
      throw new Error('INTEGRATOR_001: Una integración ACTIVE requiere endpoint principal y alias de credencial');
    }
  }

  // Relación con BaseEntity (opcional, si aplica)
  // @OneToOne(() => BaseEntity, { cascade: true })
  // @JoinColumn()
  // base!: BaseEntity;

  constructor() {
    super();
    this.type = 'integrator';
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
  static fromDto(dto: CreateIntegratorDto): Integrator;
  static fromDto(dto: UpdateIntegratorDto): Integrator;
  static fromDto(dto: DeleteIntegratorDto): Integrator;
  static fromDto(dto: any): Integrator {
    // plainToInstance soporta todos los DTOs
    return plainToInstance(Integrator, dto);
  }
}
