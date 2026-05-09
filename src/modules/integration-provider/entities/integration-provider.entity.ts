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
import { CreateIntegrationProviderDto, UpdateIntegrationProviderDto, DeleteIntegrationProviderDto } from '../dtos/all-dto';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';
import { plainToInstance } from 'class-transformer';



@ChildEntity('integrationprovider')
@ObjectType()
export class IntegrationProvider extends BaseEntity {
  @ApiProperty({
    type: String,
    nullable: false,
    description: "Nombre de la instancia de IntegrationProvider",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de IntegrationProvider", nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false, comment: 'Este es un campo para nombrar la instancia IntegrationProvider' })
  private name!: string;

  @ApiProperty({
    type: String,
    description: "Descripción de la instancia de IntegrationProvider",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de IntegrationProvider", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false, default: "Sin descripción", comment: 'Este es un campo para describir la instancia IntegrationProvider' })
  private description!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Código del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Código del proveedor', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 60, unique: true, comment: 'Código del proveedor' })
  code!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Nombre visible del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Nombre visible del proveedor', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 140, comment: 'Nombre visible del proveedor' })
  displayName!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Tipo funcional del proveedor',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Tipo funcional del proveedor', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 60, comment: 'Tipo funcional del proveedor' })
  providerKind!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Clasificación externa o interna',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Clasificación externa o interna', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, comment: 'Clasificación externa o interna' })
  vendorType!: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Documentación técnica relevante',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Documentación técnica relevante', nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 250, comment: 'Documentación técnica relevante' })
  documentationUrl?: string = '';

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si soporta webhooks',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si soporta webhooks', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Indica si soporta webhooks' })
  supportsWebhook!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si soporta OAuth2',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si soporta OAuth2', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Indica si soporta OAuth2' })
  supportsOAuth2!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Indica si soporta API Key',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Indica si soporta API Key', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: true, comment: 'Indica si soporta API Key' })
  supportsApiKey!: boolean;

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos del proveedor',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos del proveedor', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Metadatos del proveedor' })
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
    this.type = 'integrationprovider';
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
  static fromDto(dto: CreateIntegrationProviderDto): IntegrationProvider;
  static fromDto(dto: UpdateIntegrationProviderDto): IntegrationProvider;
  static fromDto(dto: DeleteIntegrationProviderDto): IntegrationProvider;
  static fromDto(dto: any): IntegrationProvider {
    // plainToInstance soporta todos los DTOs
    return plainToInstance(IntegrationProvider, dto);
  }
}
