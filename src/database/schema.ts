import {
    pgTable,
    varchar,
    uuid,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const userTable = pgTable("users", {
    id: uuid().primaryKey(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
    status: boolean().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const driverTable = pgTable("drivers", {
    id: uuid().primaryKey(),
    name: varchar().notNull(),
    status: boolean().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const vehicleTable = pgTable("vehicles", {
    id: uuid().primaryKey(),
    model: varchar().notNull(),
    plate: varchar().notNull().unique(),
    status: boolean().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const requestsTable = pgTable("requests", {
    id: uuid().primaryKey(),
    departureDate: timestamp("departure_date", {
        withTimezone: true,
    }).notNull(),
    returnDate: timestamp("return_date", { withTimezone: true }).notNull(),
    applicant: varchar().notNull(),
    destination: varchar().notNull(),
    idDriver: uuid("id_driver").references(() => driverTable.id),
    idVehicle: uuid("id_vehicle").references(() => vehicleTable.id),
    idRequestStatus: uuid("id_request_status").references(
        () => requestStatusTable.id
    ),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const requestStatusTable = pgTable("requests_status", {
    id: uuid().primaryKey(),
    name: varchar().notNull(),
    status: boolean().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});

export const requestsRelations = relations(requestsTable, ({ one }) => ({
    driver: one(driverTable, {
        fields: [requestsTable.idDriver],
        references: [driverTable.id],
    }),
    vehicle: one(vehicleTable, {
        fields: [requestsTable.idVehicle],
        references: [vehicleTable.id],
    }),
    requestStatus: one(requestStatusTable, {
        fields: [requestsTable.idRequestStatus],
        references: [requestStatusTable.id],
    }),
}));

export const driversRelations = relations(driverTable, ({ many }) => ({
    requests: many(requestsTable),
}));

export const vehiclesRelations = relations(vehicleTable, ({ many }) => ({
    requests: many(requestsTable),
}));

export const requestStatusTableRelations = relations(
    requestStatusTable,
    ({ many }) => ({
        requests: many(requestsTable),
    })
);
