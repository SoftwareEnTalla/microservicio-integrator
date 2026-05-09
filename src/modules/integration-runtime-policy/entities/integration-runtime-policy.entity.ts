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
import { CreateIntegrationRuntimePolicyDto, UpdateIntegrationRuntimePolicyDto, DeleteIntegrationRuntimePolicyDto } from '../dtos/all-dto';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';
import { plainToInstance } from 'class-transformer';



@ChildEntity('integrationruntimepolicy')
@ObjectType()
export class IntegrationRuntimePolicy extends BaseEntity {
  @ApiProperty({
    type: String,
    nullable: false,
    description: "Nombre de la instancia de IntegrationRuntimePolicy",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de IntegrationRuntimePolicy", nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false, comment: 'Este es un campo para nombrar la instancia IntegrationRuntimePolicy' })
  private name!: string;

  @ApiProperty({
    type: String,
    description: "Descripción de la instancia de IntegrationRuntimePolicy",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de IntegrationRuntimePolicy", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false, default: "Sin descripción", comment: 'Este es un campo para describir la instancia IntegrationRuntimePolicy' })
  private description!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Integración propietaria de la política',
  })
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Integración propietaria de la política', nullable: false })
  @Column({ type: 'uuid', nullable: false, comment: 'Integración propietaria de la política' })
  integratorId!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Estrategia de reintentos',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Estrategia de reintentos', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, comment: 'Estrategia de reintentos' })
  retryStrategy!: string;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    description: 'Máximo de reintentos',
  })
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Máximo de reintentos', nullable: false })
  @Column({ type: 'int', nullable: false, default: 3, comment: 'Máximo de reintentos' })
  maxRetries!: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    description: 'Backoff entre reintentos',
  })
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Backoff entre reintentos', nullable: false })
  @Column({ type: 'int', nullable: false, default: 1000, comment: 'Backoff entre reintentos' })
  retryBackoffMs!: number;

  @ApiProperty({
    type: () => Number,
    nullable: true,
    description: 'Límite por minuto',
  })
  @IsInt()
  @IsOptional()
  @Field(() => Int, { description: 'Límite por minuto', nullable: true })
  @Column({ type: 'int', nullable: true, comment: 'Límite por minuto' })
  rateLimitPerMinute?: number = 0;

  @ApiProperty({
    type: () => Number,
    nullable: false,
    description: 'Timeout general de la política',
  })
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { description: 'Timeout general de la política', nullable: false })
  @Column({ type: 'int', nullable: false, default: 30000, comment: 'Timeout general de la política' })
  timeoutMs!: number;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Habilita circuit breaker',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Habilita circuit breaker', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: true, comment: 'Habilita circuit breaker' })
  circuitBreakerEnabled!: boolean;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Ruta de healthcheck',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Ruta de healthcheck', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 150, comment: 'Ruta de healthcheck' })
  healthCheckPath?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Canal de alertas',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Canal de alertas', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 80, comment: 'Canal de alertas' })
  alertChannel?: string = '';

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales de la política',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales de la política', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales de la política' })
  metadata?: Record<string, any> = {};

  protected executeDslLifecycle(): void {
    // No se definieron business-rules en el DSL.
  }

  // Relación con BaseEntity (opcional, si aplica)
  // @OneToOne(() => BaseEntity, { cascade: true })
  // @JoinColumn()
  // base!: BaseEntity;

  constructor() {
    super();
    this.type = 'integrationruntimepolicy';
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
  static fromDto(dto: CreateIntegrationRuntimePolicyDto): IntegrationRuntimePolicy;
  static fromDto(dto: UpdateIntegrationRuntimePolicyDto): IntegrationRuntimePolicy;
  static fromDto(dto: DeleteIntegrationRuntimePolicyDto): IntegrationRuntimePolicy;
  static fromDto(dto: any): IntegrationRuntimePolicy {
    // plainToInstance soporta todos los DTOs
    return plainToInstance(IntegrationRuntimePolicy, dto);
  }
}
