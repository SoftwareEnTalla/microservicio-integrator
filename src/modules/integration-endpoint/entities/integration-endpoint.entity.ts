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
import { CreateIntegrationEndpointDto, UpdateIntegrationEndpointDto, DeleteIntegrationEndpointDto } from '../dtos/all-dto';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';
import { plainToInstance } from 'class-transformer';



@ChildEntity('integrationendpoint')
@ObjectType()
export class IntegrationEndpoint extends BaseEntity {
  @ApiProperty({
    type: String,
    nullable: false,
    description: "Nombre de la instancia de IntegrationEndpoint",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de IntegrationEndpoint", nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false, comment: 'Este es un campo para nombrar la instancia IntegrationEndpoint' })
  private name!: string;

  @ApiProperty({
    type: String,
    description: "Descripción de la instancia de IntegrationEndpoint",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de IntegrationEndpoint", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false, default: "Sin descripción", comment: 'Este es un campo para describir la instancia IntegrationEndpoint' })
  private description!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Integración propietaria del endpoint',
  })
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Integración propietaria del endpoint', nullable: false })
  @Column({ type: 'uuid', nullable: false, comment: 'Integración propietaria del endpoint' })
  integratorId!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Tipo de endpoint',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Tipo de endpoint', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, comment: 'Tipo de endpoint' })
  endpointType!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'URL base del endpoint',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'URL base del endpoint', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 250, comment: 'URL base del endpoint' })
  baseUrl!: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Host principal',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Host principal', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 150, comment: 'Host principal' })
  host?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'DNS asociado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'DNS asociado', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 150, comment: 'DNS asociado' })
  dnsName?: string = '';

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Allowlist de IPs',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Allowlist de IPs', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Allowlist de IPs' })
  ipAllowlist?: Record<string, any> = {};

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Allowlist de DNS',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Allowlist de DNS', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Allowlist de DNS' })
  dnsAllowlist?: Record<string, any> = {};

  @ApiProperty({
    type: () => Number,
    nullable: true,
    description: 'Puerto técnico',
  })
  @IsInt()
  @IsOptional()
  @Field(() => Int, { description: 'Puerto técnico', nullable: true })
  @Column({ type: 'int', nullable: true, comment: 'Puerto técnico' })
  port?: number = 0;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Ruta base',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Ruta base', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 150, comment: 'Ruta base' })
  basePath?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Región técnica',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Región técnica', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 60, comment: 'Región técnica' })
  region?: string = '';

  @ApiProperty({
    type: () => Number,
    nullable: true,
    description: 'Timeout en milisegundos',
  })
  @IsInt()
  @IsOptional()
  @Field(() => Int, { description: 'Timeout en milisegundos', nullable: true })
  @Column({ type: 'int', nullable: true, default: 30000, comment: 'Timeout en milisegundos' })
  timeoutMs?: number = 0;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Proxy técnico si aplica',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Proxy técnico si aplica', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 250, comment: 'Proxy técnico si aplica' })
  proxyUrl?: string = '';

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si es el endpoint principal',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si es el endpoint principal', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Indica si es el endpoint principal' })
  isPrimary!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si acepta tráfico entrante',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si acepta tráfico entrante', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Indica si acepta tráfico entrante' })
  isInbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si se usa para tráfico saliente',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si se usa para tráfico saliente', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: true, comment: 'Indica si se usa para tráfico saliente' })
  isOutbound!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si es callback/webhook',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si es callback/webhook', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Indica si es callback/webhook' })
  isCallback!: boolean;

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales del endpoint',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales del endpoint', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales del endpoint' })
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
    this.type = 'integrationendpoint';
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
  static fromDto(dto: CreateIntegrationEndpointDto): IntegrationEndpoint;
  static fromDto(dto: UpdateIntegrationEndpointDto): IntegrationEndpoint;
  static fromDto(dto: DeleteIntegrationEndpointDto): IntegrationEndpoint;
  static fromDto(dto: any): IntegrationEndpoint {
    // plainToInstance soporta todos los DTOs
    return plainToInstance(IntegrationEndpoint, dto);
  }
}
