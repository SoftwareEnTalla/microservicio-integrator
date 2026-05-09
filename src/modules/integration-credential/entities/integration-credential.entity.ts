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
import { CreateIntegrationCredentialDto, UpdateIntegrationCredentialDto, DeleteIntegrationCredentialDto } from '../dtos/all-dto';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';
import { plainToInstance } from 'class-transformer';



@ChildEntity('integrationcredential')
@ObjectType()
export class IntegrationCredential extends BaseEntity {
  @ApiProperty({
    type: String,
    nullable: false,
    description: "Nombre de la instancia de IntegrationCredential",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de IntegrationCredential", nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false, comment: 'Este es un campo para nombrar la instancia IntegrationCredential' })
  private name!: string;

  @ApiProperty({
    type: String,
    description: "Descripción de la instancia de IntegrationCredential",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de IntegrationCredential", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false, default: "Sin descripción", comment: 'Este es un campo para describir la instancia IntegrationCredential' })
  private description!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Integración propietaria de la credencial',
  })
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Integración propietaria de la credencial', nullable: false })
  @Column({ type: 'uuid', nullable: false, comment: 'Integración propietaria de la credencial' })
  integratorId!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Alias funcional de la credencial',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Alias funcional de la credencial', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 100, comment: 'Alias funcional de la credencial' })
  alias!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Tipo de credencial',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Tipo de credencial', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, comment: 'Tipo de credencial' })
  credentialType!: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Client ID asociado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Client ID asociado', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 200, comment: 'Client ID asociado' })
  clientId?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'API Key asociada',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'API Key asociada', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 255, comment: 'API Key asociada' })
  apiKey?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Client Secret asociado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Client Secret asociado', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 255, comment: 'Client Secret asociado' })
  clientSecret?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Access token actual',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Access token actual', nullable: true })
  @Column({ type: 'text', nullable: true, comment: 'Access token actual' })
  accessToken?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Refresh token actual',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Refresh token actual', nullable: true })
  @Column({ type: 'text', nullable: true, comment: 'Refresh token actual' })
  refreshToken?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Secreto de webhook',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Secreto de webhook', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 255, comment: 'Secreto de webhook' })
  webhookSecret?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Estado de la credencial',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Estado de la credencial', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, comment: 'Estado de la credencial' })
  status!: string;

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha de expiración',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha de expiración', nullable: true })
  @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de expiración' })
  expiresAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha de última rotación',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha de última rotación', nullable: true })
  @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última rotación' })
  rotatedAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha prevista de siguiente rotación',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha prevista de siguiente rotación', nullable: true })
  @Column({ type: 'timestamp', nullable: true, comment: 'Fecha prevista de siguiente rotación' })
  nextRotationAt?: Date = new Date();

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Huella o resumen de la credencial',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Huella o resumen de la credencial', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 120, comment: 'Huella o resumen de la credencial' })
  fingerprint?: string = '';

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales de la credencial',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales de la credencial', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales de la credencial' })
  metadata?: Record<string, any> = {};

  protected executeDslLifecycle(): void {
    // Rule: active-credential-requires-secret-material
    // Una credencial activa debe tener al menos un material secreto utilizable.
    if (!(this.status === 'ACTIVE')) {
      throw new Error('INTEGRATION_CREDENTIAL_001: Una credencial ACTIVE requiere apiKey, clientSecret, accessToken o webhookSecret');
    }
  }

  // Relación con BaseEntity (opcional, si aplica)
  // @OneToOne(() => BaseEntity, { cascade: true })
  // @JoinColumn()
  // base!: BaseEntity;

  constructor() {
    super();
    this.type = 'integrationcredential';
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
  static fromDto(dto: CreateIntegrationCredentialDto): IntegrationCredential;
  static fromDto(dto: UpdateIntegrationCredentialDto): IntegrationCredential;
  static fromDto(dto: DeleteIntegrationCredentialDto): IntegrationCredential;
  static fromDto(dto: any): IntegrationCredential {
    // plainToInstance soporta todos los DTOs
    return plainToInstance(IntegrationCredential, dto);
  }
}
