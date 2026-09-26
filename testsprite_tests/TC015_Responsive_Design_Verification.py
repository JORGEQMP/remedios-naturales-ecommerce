import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Resize browser or use emulator to simulate tablet screen.
        frame = context.pages[-1]
        # Click the 'Cambiar tema' button to toggle theme for light/dark mode check
        elem = frame.locator('xpath=html/body/div[2]/header/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Resize browser or use emulator to simulate tablet screen and verify responsive layout.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 300)
        

        # -> Simulate tablet screen by resizing or using emulator and verify responsive layout.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 300)
        

        # -> Simulate tablet screen by resizing or using emulator and verify responsive layout and UI elements.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 300)
        

        # -> Simulate tablet screen by resizing or using emulator and verify responsive layout and UI elements.
        frame = context.pages[-1]
        # Click 'Cambiar tema' button to toggle back to light mode for tablet testing
        elem = frame.locator('xpath=html/body/div[2]/header/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Simulate tablet screen by resizing or using emulator and verify responsive layout and UI elements.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Simulate tablet screen by resizing or using emulator and verify responsive layout and UI elements.
        await page.mouse.wheel(0, 500)
        

        frame = context.pages[-1]
        # Click 'Cambiar tema' button to toggle theme for tablet testing
        elem = frame.locator('xpath=html/body/div[2]/header/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Simulate tablet screen by resizing or using emulator and verify responsive layout and UI elements.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        await page.mouse.wheel(0, 300)
        

        # -> Simulate tablet screen by resizing or using emulator and verify responsive layout and UI elements.
        await page.mouse.wheel(0, 300)
        

        # -> Simulate mobile viewport and verify mobile navigation and UI components render correctly and remain accessible.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Simulate mobile viewport and verify mobile navigation and UI components render correctly and remain accessible.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Simulate mobile viewport and verify mobile navigation and UI components render correctly and remain accessible.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Simulate mobile viewport and verify mobile navigation and UI components render correctly and remain accessible.
        frame = context.pages[-1]
        # Click 'Cambiar tema' button to toggle theme for mobile testing
        elem = frame.locator('xpath=html/body/div[2]/header/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Simulate mobile viewport and verify mobile navigation and UI components render correctly and remain accessible.
        frame = context.pages[-1]
        # Click 'Cambiar tema' button to toggle theme for mobile testing
        elem = frame.locator('xpath=html/body/div[2]/header/div/div/div[2]/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Envio a').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Peru').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Envio Confiable').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Devoluciones Faciles').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Compra Segura').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=BT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=BasicTechShop').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=PRODUCTOS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cambiar tema').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Favoritos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Carrito').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ingresar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Registrarse').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Nuevo Lanzamiento').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=RTX Serie 40').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Potencia Maxima').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Las tarjetas graficas mas potentes para gaming y creacion de contenido').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ver GPUs').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ver Todo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Hasta 40% OFF').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Monitores Gaming').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=240Hz QHD').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=La mejor experiencia visual con monitores de alta tasa de refresco').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ver Ofertas').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Bestseller').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Perifericos Pro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Precision Total').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Teclados mecanicos y mouse gaming de las mejores marcas').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Explorar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Previous slide').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Next slide').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Almacenamiento').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Audifonos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Componentes').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Computadoras').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Monitores').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mouse').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Teclados').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Nuevo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Agregar a favoritos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Agregar').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Razer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Laptop Thinkpad').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=4.5').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=S/ 1000.00').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=3 disponibles').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=-21%').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=AMD').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ryzen 9 7950X').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=S/ 549.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=S/ 699.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=7 disponibles').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=DeathAdder V3 Pro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=149.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=18 disponibles').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=-13%').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Samsung').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Odyssey G9 49"').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1299.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=1499.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=-8%').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Corsair').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=K100 RGB Mechanical').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=229.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=249.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Logitech').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=G Pro X Superlight 2').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=159.99').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ASUS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ROG Strix GeForce RTX 4080').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Marcas que Confiamos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Trabajamos con las mejores marcas del mercado').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ASUS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=MSI').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Corsair').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Logitech').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Razer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=HyperX').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Kingston').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Samsung').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=BT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tu tienda de tecnologia de confianza. Los mejores productos de computacion a los mejores precios.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Productos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Computadoras').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Monitores').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Teclados').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mouse').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Audifonos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Componentes').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Empresa').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Sobre Nosotros').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Contacto').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Blog').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Trabaja con Nosotros').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ayuda').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Centro de Ayuda').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Envios y Entregas').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Devoluciones').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Garantia').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Preguntas Frecuentes').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Av. Tecnologia 123, Lima, Peru').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+51 999 888 777').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=info@basictechshop.com').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2026 BasicTechShop. Todos los derechos reservados.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Terminos y Condiciones').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Politica de Privacidad').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cookies').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    