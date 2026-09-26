"use client"

import { CreditCard, Building2, Wallet } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function PaymentForm() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Metodo de Pago</h2>

      <RadioGroup defaultValue="card" className="space-y-3">
        {/* Credit Card */}
        <div>
          <RadioGroupItem
            value="card"
            id="card"
            className="peer sr-only"
          />
          <Label
            htmlFor="card"
            className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
          >
            <CreditCard className="h-5 w-5 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">Tarjeta de Credito/Debito</p>
              <p className="text-sm text-muted-foreground">
                Visa, Mastercard, American Express
              </p>

              {/* Card Details - shown when selected */}
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numero de Tarjeta</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="expiry">Fecha de Expiracion</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                  <Input id="cardName" placeholder="JUAN PEREZ" />
                </div>
              </div>
            </div>
          </Label>
        </div>

        {/* Bank Transfer */}
        <div>
          <RadioGroupItem
            value="transfer"
            id="transfer"
            className="peer sr-only"
          />
          <Label
            htmlFor="transfer"
            className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
          >
            <Building2 className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Transferencia Bancaria</p>
              <p className="text-sm text-muted-foreground">
                BCP, BBVA, Interbank, Scotiabank
              </p>
            </div>
          </Label>
        </div>

        {/* Digital Wallet */}
        <div>
          <RadioGroupItem
            value="wallet"
            id="wallet"
            className="peer sr-only"
          />
          <Label
            htmlFor="wallet"
            className="flex cursor-pointer items-start gap-4 rounded-lg border p-4 peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
          >
            <Wallet className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Billetera Digital</p>
              <p className="text-sm text-muted-foreground">
                Yape, Plin, PayPal
              </p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
