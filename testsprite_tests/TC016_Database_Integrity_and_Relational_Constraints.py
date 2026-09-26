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
        # -> Log in to the application to perform API actions for database testing.
        frame = context.pages[-1]
        # Click on 'Ingresar' button to open login form
        elem = frame.locator('xpath=html/body/div[2]/header/div/div/div[2]/div/a/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Input email and password, then submit login form.
        frame = context.pages[-1]
        # Input email for login
        elem = frame.locator('xpath=html/body/div[2]/div/div/div/form/div/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('fazt@faztweb.com')
        

        frame = context.pages[-1]
        # Input password for login
        elem = frame.locator('xpath=html/body/div[2]/div/div/div/form/div/div[2]/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('faztpassword')
        

        frame = context.pages[-1]
        # Click 'Iniciar Sesión' button to submit login form
        elem = frame.locator('xpath=html/body/div[2]/div/div/div/form/div[2]/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Insert product with valid foreign keys (category, brand) into database via API.
        await page.goto('http://localhost:3000/api/products', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Laptop Thinkpad').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Razer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=computadoras').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Laptop Lenovo').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dell').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=componentes').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=FURY Beast 32GB DDR5').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Kingston').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Huntsman V2 TKL').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Razer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=teclados').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=UltraGear 27GP950').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=LG').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=monitores').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Ryzen 9 7950X').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=AMD').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=MAG B650 TOMAHAWK').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=MSI').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=DeathAdder V3 Pro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Razer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=mouse').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=970 EVO Plus 2TB').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Samsung').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=almacenamiento').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cloud III Wireless').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=HyperX').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=audifonos').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Odyssey G9 49"').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Samsung').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=monitores').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=K100 RGB Mechanical').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Corsair').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=teclados').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=G Pro X Superlight 2').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Logitech').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=mouse').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ROG Strix GeForce RTX 4080').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ASUS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=componentes').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    