"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ShippingForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Informacion de Envio</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input id="firstName" placeholder="Juan" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input id="lastName" placeholder="Perez" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo Electronico</Label>
        <Input id="email" type="email" placeholder="juan@ejemplo.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefono</Label>
        <Input id="phone" type="tel" placeholder="+51 999 888 777" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Direccion</Label>
        <Input id="address" placeholder="Av. Principal 123" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" placeholder="Lima" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Departamento</Label>
          <Select>
            <SelectTrigger id="state">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lima">Lima</SelectItem>
              <SelectItem value="arequipa">Arequipa</SelectItem>
              <SelectItem value="cusco">Cusco</SelectItem>
              <SelectItem value="trujillo">La Libertad</SelectItem>
              <SelectItem value="piura">Piura</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip">Codigo Postal</Label>
          <Input id="zip" placeholder="15001" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notas adicionales (opcional)</Label>
        <Input
          id="notes"
          placeholder="Instrucciones de entrega, referencias, etc."
        />
      </div>
    </div>
  )
}
