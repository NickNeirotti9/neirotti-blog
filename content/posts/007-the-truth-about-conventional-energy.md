---
id: 7
title: The Truth About Conventional Energy
date: '2025-03-01T14:48:00Z'
subcategory: Engineering
subject: Energy
youtube: 8wc3KjLM_To
spotify: >-
  https://open.spotify.com/episode/4cYVUQgxmskCP6km0K7mRF?si=kfMn9n3_RfqbAtrgQH8uQg
hook: 'A complete guide to coal, oil, gas, and nuclear power'
featured: true
related:
  - 2
  - 3
  - 5
---

## Introduction

	Power generation is the backbone of modern civilization, supplying the energy needed to fuel industries, households, and infrastructure. As energy demands grow rapidly due to population increases, the adoption of electric vehicles, and the rise of digital technologies like artificial intelligence (AI), the Internet of Things (IoT), and cloud computing, conventional power plants continue to play a pivotal role even as renewable energy technologies advance. In 2023, coal, natural gas, nuclear, and petroleum collectively accounted for \~91% of U.S. energy consumption and \~80% globally. While these technologies provide much of our energy security, they also present challenges, particularly in the face of a worsening climate crisis. By shedding light on the complex mechanics, advantages, and drawbacks of these primary technologies, this guide seeks to equip you with the knowledge to appreciate and critique the world’s energy systems as they adapt to meet future demands.

## Key Metrics & Terms

| **Parameter** | **Definition** |
| --- | --- |
| Cycle Type | The thermodynamic cycle (e.g., Rankine, Brayton) used in power generation. |
| Peak Temperature | The maximum temperature in the cycle. |
| Condenser Temperature | The temperature at which waste heat is rejected. |
| Condenser Cooling Rate | The rate at which the condenser removes heat. |
| Power Capacity | The maximum output a cycle can generate. |
| Capacity Factor | How often a power plant actually produces electricity compared to its maximum possible output if it ran at full capacity measured over a year. |
| Cycle Efficiency | The percentage of fuel energy converted into electricity, a key indicator of plant performance. |
| Heat Value | The amount of energy a fuel can release when burned. |
| Heat Rate | The fuel energy needed to generate one kilowatt-hour; lower heat rates indicate better efficiency. |
| Emission Rates | The quantity of pollutants emitted, see relevant pollutants section. |
| Capital Cost | The initial investment cost to build the plant. |
| Fixed O&M Costs (\$/kW-year) | Annual fixed costs for operation and maintenance, unrelated to energy production levels. Includes routine labor, contract services, general expenses, etc. |
| Variable O&M Costs (\$/MWh) | Operational costs that vary with electricity output, such as fuel, water consumption, chemicals, and consumables. |
| Expected Operational Life | The duration a plant can operate before requiring replacement. |

## Relevant Thermodynamics

	Understanding the thermodynamic principles behind power generation is essential to appreciating how power plants operate and how they can be optimized. Most conventional power plants rely on two key thermodynamic cycles: the Rankine cycle and the Brayton cycle. But before diving into these cycles, let’s start with an essential concept: the **Carnot principle**. It tells us the maximum efficiency any heat engine can achieve:

::: center
η = 1 − T~cold~ / T~hot~
:::

	The key takeaway is that a higher temperature difference between the heat source (T~hot~) and sink (T~cold~) means better efficiency. However, real-world systems can’t reach Carnot efficiency due to energy losses and practical limitations.

__The Rankine Cycle__

1. Heat Addition: Water is heated in a boiler to produce high-pressure steam.
2. Expansion: The steam expands through a turbine, converting thermal energy into mechanical work.
3. Condensation: Steam exiting the turbine is cooled in a condenser, turning back into liquid.
4. Pumping: The liquid is pressurized by a pump and sent back to the boiler.

__The Brayton Cycle__

1. Compression: Air is compressed to high pressure in a compressor.
2. Heat Addition: Fuel is combusted in the compressed air, significantly increasing its temperature.
3. Expansion: The high-temperature gases expand through a turbine, performing mechanical work.
4. Exhaust: The remaining heat is either discharged or captured in a heat recovery system.

__The Otto Cycle__

1. Intake: Air-fuel mixture enters the cylinder as the piston moves downward.
2. Compression: The piston moves up, compressing the mixture and increasing its temperature and pressure.
3. Combustion (Power Stroke): A spark ignites the compressed mixture, causing rapid expansion that forces the piston downward, generating mechanical work.
4. Exhaust: The piston moves up again, expelling the burned gases through the exhaust valve, preparing for the next cycle.

__The Vapor Compression Cycle__

1. Compression: Low-pressure refrigerant vapor is compressed by a compressor, raising its temperature and pressure.
2. Condensation: The high-pressure, high-temperature vapor releases heat in the condenser, turning into a high-pressure liquid. This step removes unwanted heat from the system.
3. Expansion: The liquid refrigerant passes through an expansion valve, reducing its pressure and temperature.
4. Evaporation: The low-pressure liquid absorbs heat in the evaporator, evaporating back into a low-pressure vapor, completing the cycle. This heat absorption is the cooling effect of the cycle.

__Efficiency Improvements__

	Improving the efficiency of power plants involves minimizing energy losses and maximizing the useful work extracted from the fuel. They are essential to reduce fuel consumption, lower greenhouse gas emissions, and improve the economic viability of power plants. The following strategies are used to enhance the performance of power plants:

- **Combined cycles** integrate the Brayton cycle (gas turbine) and the Rankine cycle (steam turbine) to use waste heat from the gas turbine to generate steam.
- **Combined heat and power (CHP)**, also known as cogeneration, captures and utilizes waste heat from power generation for other purposes, such as heating buildings.
- **Regenerative heating** uses waste heat to preheat the working fluid. In the Brayton cycle, exhaust heat from the turbine is used to preheat compressed air before combustion. In the Rankine cycle, some steam is diverted from the turbine to heat feedwater entering the boiler. Both methods reduce the energy required for heating.
- **Multiple turbine stages**—high-pressure (HP), intermediate-pressure (IP), and low-pressure (LP) turbines—are used in both Brayton and Rankine cycles. Between stages, the working fluid is reheated by passing it back through the boiler (in the Rankine cycle) or a secondary combustor (in the Brayton cycle), restoring the fluid’s temperature and energy content. This allows it to expand through subsequent turbine stages and perform significant additional work. In the Rankine cycle, this also prevents moisture formation in the steam, protecting the turbine blades from erosion and wear.
- **Multiple compressor stages and intercooling** is used in Brayton cycles to achieve higher pressure ratios. Instead of compressing the air in a single stage, the air is compressed in smaller increments across multiple stages. Intercooling reduces the air’s temperature after each compression stage by passing it through a heat exchanger. Cooler air is easier to compress, and the energy saved during compression more than compensates for the heat lost during intercooling. A high pressure ratio is important because, at higher pressures, the fluid density increases, meaning more air molecules are available to absorb the heat energy released during combustion.

## Relevant Pollutants

__Greenhouse Gases__

- **Carbon Dioxide (CO₂)** is the primary greenhouse gas emitted from fossil fuel power plants. It forms during combustion, where carbon in the fuel combines with oxygen in the air: C(from fuel)+O₂ → CO₂. It can remain in the atmosphere for hundreds of years trapping heat, though most molecules are quickly removed by natural processes. CO₂ absorbed by oceans forms carbonic acid, which lowers the pH of seawater, harming marine life.
- **Methane (CH₄)** is often released indirectly from power generation, particularly from natural gas extraction, processing, and transportation. Methane is around 25 times more effective at trapping heat than CO₂ over a 100-year period because its molecular structure allows it to absorb more infrared radiation, the type of radiation that contributes to the greenhouse effect, making it a more potent greenhouse gas despite having a shorter lifespan in the atmosphere (\~12 years).
- **Nitrous Oxide (N₂O)** can form in power plants during high-temperature combustion when nitrogen in the air reacts with oxygen: 2N₂ + O₂ → 2N₂O. It is roughly 300 times more effective than CO₂ at trapping heat over a 100-year period, with a current atmospheric lifetime of roughly 116 years.

__Other Pollutants__

- **Sulfur Dioxide (SO₂)** is produced when sulfur in coal or oil reacts with oxygen during combustion: S(from fuel)+O₂ → SO₂. It is commonly produced in coal-fired power plants as coal often contains sulfur impurities. SO₂ contributes to acid rain when it reacts with water vapor to form sulfuric acid, harming ecosystems and infrastructure.
- **Nitrogen Oxides (NOₓ)** form during combustion at high temperatures (above 1,300°C), where nitrogen and oxygen in the air combine: N₂ + O₂ → 2NO. NOₓ contributes to ground-level ozone (smog) and acid rain, and can lead to excessive algae growth (eutrophication) in water bodies.
- **Particulate Matter (PM)** results from incomplete combustion and impurities in fuel, which include ash and trace metals (e.g., mercury, lead, cadmium). When combustion is incomplete, carbon particles form as soot or black carbon. This occurs if there isn’t enough oxygen or if the fuel doesn’t fully burn. PM contributes to respiratory issues, haze, and can settle on plants, water, and soil, impacting ecosystems.  In cold regions, it can settle on snow and ice, reducing reflectivity (albedo) which accelerates melting.
- **Carbon Monoxide (CO)** is a poisonous gas produced primarily through incomplete combustion, meaning not all fuel is fully oxidized to CO₂. Reducing CO emissions generally involves improving combustion conditions for more complete fuel burning.

## Coal

	Coal forms over millions of years from the remains of ancient plant material (peat), typically found in swampy, low-oxygen environments where decay is slowed. Layers of sediment gradually cover this plant matter, subjecting it to increasing heat and pressure. This process, called coalification, transforms the organic material into coal by driving out moisture and volatile compounds, leaving behind concentrated carbon. The intensity of heat, pressure, and time determines the type of coal produced. The four main types of coal include:

- __Lignite__,  also known as "brown coal," is the lowest grade of coal, containing 25-35% carbon and high moisture. Its low heat value is due to both its low carbon content and the energy lost in evaporating moisture during combustion. This makes lignite the least efficient and highest-emission coal type, producing more carbon dioxide and sulfur per unit of energy. Found at shallow depths, lignite is typically used in nearby power plants to reduce transport costs.
- __Subbituminous__ coal is a step above lignite, with a carbon content of 35-45% and moderate moisture levels. Its heat value is higher than lignite, but still lower than bituminous. Typically found at moderate depths in large sedimentary basins.
- __Bituminous__ coal is a mid- to high-rank coal with a carbon content of 45-86% and low to moderate moisture levels, giving it a higher heat value than subbituminous. Found at greater depths than lignite and subbituminous, often in large, compacted deposits. It is the most commonly used coal for electricity generation and is assumed for the data in this section.
- __Anthracite__ is the highest grade of coal, with a carbon content of 86-98% and very low moisture levels. Its high carbon content and dense structure give it the highest heat value among coal types, making it the most efficient for energy production. With minimal sulfur, anthracite burns cleanly, releasing fewer pollutants per unit energy compared to other coals. Typically found in compacted, hard deposits at greater depths, anthracite is less common and more expensive to mine.

	Coal is extracted through surface mining (open-pit or strip mining) when deposits are near the surface or underground mining for deeper seams. Once mined, the coal is processed to remove impurities like rock and ash and sorted by size and grade. Transportation to power plants often involves railways, barges, or conveyor systems, depending on the plant's location and proximity to the mine. Rail transport is the most common method, especially for long distances. At the plant, coal is stored in large stockpiles or silos to maintain a buffer against supply disruptions, with covered or sealed storage used to minimize moisture absorption and dust emissions.

__Bituminous Coal Composition:__

- Carbon: \~45–86%
- Hydrogen: \~5%
- Oxygen: \~10%
- Nitrogen: \~1–2%
- Sulfur: \~0.5–3%
- Ash: \~5–15%

__Bituminous Coal Heat Value:__

- 10,000-14,000 Btu/lb

### Pulverized Coal (PC)

	Pulverized coal power plants are among the most widely used and mature technologies for generating electricity from coal. In these plants, coal is ground into a fine powder and burned in a furnace, creating high-temperature steam. This steam is used to drive a turbine connected to a generator, producing electricity. Pulverizing the coal maximizes its surface area, allowing it to combust more completely and efficiently, which enhances energy output while reducing fuel consumption.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Rankine |
| Peak Temperature | • Subcritical: \~540°C (1,004°F)<br>• Supercritical: \~565°C (1,049°F)<br>• Ultra-supercritical: \~600–620°C (1,112–1,148°F) |
| Condenser Temperature | 30–40°C (86–104°F) |
| Condenser Cooling Rate | 7,000–8,000 Btu/kWh |
| Power Capacity | • Subcritical: 300–500 MW per unit<br>• Supercritical: 500–800 MW per unit<br>• Ultra-supercritical: 650–1,200+ MW per unit |
| Capacity Factor | 50-85% |
| Cycle Efficiency | • Subcritical: \~33–37%<br>• Supercritical: \~38–42%<br>• Ultra-supercritical: \~43–47% |
| Heat Rate | 8,500-11,000 Btu/kWh |
| Emission Rates | __Without controls (lbs/MWh):__<br>• CO₂: \~2,000–2,200<br>• SO₂: \~10–12<br>• NOₓ: \~4–6<br>• Particulates: \~0.5–1<br>__With controls (lbs/MWh):__<br>• CO₂: \~1,600–1,800<br>• SO₂: \~0.1–0.3<br>• NOₓ: \~0.1–0.5<br>• Particulates: \~0.01–0.1 |
| Capital Cost | \$1,500–3,000 per kW |
| Fixed O&M Costs | \$30-50 per kW-year |
| Variable O&M Costs | \$4-6 per MWh |
| Expected Operational Life | 40-60 years |

### Integrated Coal Gasification Combined Cycle (IGCC)

	IGCC plants represent a more environmentally friendly and advanced method of generating electricity from coal. Unlike traditional coal plants, IGCC technology first converts coal into a synthesis gas, or "syngas," through a process called gasification, which involves reacting coal with oxygen and steam under high pressure. The resulting syngas, primarily composed of hydrogen and carbon monoxide, is cleaned of impurities and then combusted in a gas turbine to generate electricity. The waste heat from this process is used to produce steam, which drives a turbine, thereby creating a combined cycle that improves efficiency.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Brayton + Rankine |
| Peak Temperature | 1,500-1,900°C (2,732-3,452°F) |
| Condenser Temperature | 30-40°C (86-104°F) |
| Condenser Cooling Rate | 7,000–8,500 Btu/kWh |
| Power Capacity | 250-625 MW |
| Capacity Factor | 70-85% |
| Cycle Efficiency | 38-47% |
| Heat Rate | 7,500-9,500 Btu/kWh |
| Emission Rates | __Without controls (lbs/MWh):__<br>• CO₂: \~1,800–2,000<br>• SO₂: \~1–2<br>• NOₓ: \~0.5–0.8<br>• Particulates: \~0.1–0.2<br>__With controls (lbs/MWh):__<br>• CO₂: \~200–300<br>• SO₂: \~0.02–0.09<br>• NOₓ: \~0.05–0.15<br>• Particulates: \~0.005–0.01 |
| Capital Cost | \$2,000-3,250/kW |
| Fixed O&M Costs | \$80-130/kW-year |
| Variable O&M Costs | \$4-9/MWh |
| Expected Operational Life | 30-40 years |

### Analysis



#### Emission & Waste Treatment

	Coal’s environmental impact, from habitat destruction during mining to air and water pollution, is significant, with CO₂ emissions posing the greatest challenge. Since CO₂ is an inevitable byproduct of combustion, improving plant efficiency through methods like heat recovery and combined heat and power is a critical first step. Furthermore, active emission reduction technologies include:

- __Carbon Capture and Storage (CCS):__ CO₂ is isolated from flue gases or syngas through two main approaches: chemical solvents, such as amines that react with CO₂ to form a compound, or physical separation methods like pressure swing adsorption (PSA), membrane filtration, or cryogenic distillation. Chemical solvents are particularly effective for post-combustion flue gases with lower CO₂ concentrations, while physical methods are better suited for pre-combustion processes where CO₂ concentrations are higher. Once captured, the CO2 is compressed into a supercritical state and transported for storage in deep geological formations. This process reduces CO2 emissions by up to 90% but consumes \~15-30% of a plant’s energy production and skyrockets costs. Very few coal plants are fitted with CCS (\~1%).
- __Selective Catalytic Reduction (SCR):__ Ammonia or urea is injected into flue gases, reacting with nitrogen oxides (NOₓ) in the presence of a catalyst (TiO₂ or V₂O₅) into nitrogen and water. The process operates best between 300–400°C (570–750°F), so it's done for flue gases exiting combustion chambers. Below this range unreacted ammonia may escape as "ammonia slip" and above the catalyst may degrade or NOₓ reduction efficiency may drop due to competing reactions hence the need for precise ratio control of ammonia-to-NOₓ. SCR is modular, scalable, and typically achieves 70-90% removal efficiency.
- __Flue Gas Desulfurization (FGD):__ SO₂ is removed by reacting it with lime or limestone, producing gypsum as a byproduct which can be used in the construction industry. Wet FGD is 90-99% efficient at removing SO₂ and most coal plants are fitted with it (\~95%). Despite their efficiency, FGD systems use a lot of water, energy, and produce waste streams, such as scrubber sludge (slurry of unreacted lime/limestone, water, and insoluble solids such as ash, silica, or residual carbon).
- __Electrostatic Precipitators (ESPs) and Fabric Filters:__ ESPs use an electric field to charge particles in the flue gas, which are then attracted to oppositely charged collection plates and removed as solid waste. Fabric Filters, also known as baghouses, operate by passing flue gas through tightly woven or felted filter bags that trap particles on their surfaces while allowing clean air to pass through. These systems capture over 99% of particulates, though they require regular maintenance (cleaning filter bags) and the collected particulates need to be safely managed to prevent secondary environmental contamination.

	IGCC plants outperform traditional PC plants by integrating pre-combustion cleaning processes that remove most pollutants before combustion. This reduces the need for downstream controls and results in lower emissions of CO₂, SO₂, NOₓ, and particulates.

	Recycling byproducts like gypsum, fly ash, and slag into construction materials helps mitigate waste disposal impacts. While these technologies are essential for reducing pollution, they require substantial investment and operational costs.

#### Environmental & Economic Influences

	While coal remains a relatively inexpensive source of baseload power in many regions, factors such as location, emissions control investments, and energy market competition heavily influence the cost-effectiveness and long-term viability of coal power plants.

- __Proximity to Fuel Sources:__ Coal power plants are often located near coal mines to minimize transportation costs.
- __Water Availability:__ Large quantities of water are needed for cooling and steam generation, making proximity to water bodies a critical factor.
- __Externalities:__ Environmental damages, such as health costs from air pollution and CO₂ emissions, may be internalized through carbon pricing, taxes, or fines, increasing the price of coal-generated electricity.

#### Current Trends & Future Outlook

	The landscape of coal-fired power generation is undergoing significant changes, influenced by environmental policies, economic factors, and technological advancements. In the U.S., coal is predominantly used for electricity generation (91.7%), with a smaller share (8.2%) consumed for industrial purposes, such as cement production and steelmaking. But despite its historical reliance, the nation is experiencing a steady decline in coal-fired power. In 2023, coal accounted for 9% of the nation's energy, a sharp decrease from 37% in 1950. Not to mention 23% of the current U.S. coal-fired capacity is scheduled for retirement by 2029, driven by competition from natural gas and renewables, as well as aging infrastructure. China continues to lead in coal power development, with 70.2 GW of new construction beginning in 2023, sustaining its 60% reliance on coal for energy supply. India maintains the second-largest coal fleet globally. This surge contrasts with global trends of reducing coal capacity where these two nations account for nearly all new coal proposals. As of January 2024, 101 countries have committed to "No New Coal" policies or have abandoned coal projects, signaling a global move towards cleaner energy.

### Conclusion

	Coal power generation has been a cornerstone of global industrialization, providing reliable and affordable energy for decades. However, its significant environmental costs—greenhouse gas emissions, air pollution, and habitat destruction—have placed it at the center of the climate crisis. While advances in efficiency and emissions control have mitigated some impacts, coal remains one of the dirtiest energy sources. Technologies like IGCC offer a cleaner alternative, but its reliance on fossil fuels, high costs, and complexity underscore the need for better solutions.

__My opinion:__ coal power’s legacy is undeniable, but its role in the energy mix must diminish if we are to ensure a livable planet for future generations.

### References

[EIA Coal Types Explained](https://www.eia.gov/energyexplained/coal/)\
[IECM 2019 - Pulverized Coal Technical Documentation](https://www.uwyo.edu/iecm/_bfiles/documentation/201903_iecmtd_cp-apc-rev-a.pdf)\
[Supercritical Pulverized Coal Study by Sarda et al.](https://www.mdpi.com/2227-9717/6/11/226)\
[Subcritical Pulverized Coal Optimization by Eslick et al.](https://www.osti.gov/pages/servlets/purl/1889452)\
[ScienceDirect 2016 - Pulverized Coal](https://www.sciencedirect.com/topics/engineering/pulverised-coal)\
[How Thermal Power Plants Work Video by Sabins Civil Engineering](https://www.youtube.com/watch?v=IdPTuwKEfmA)\
[IGCC Video by UK Center for Applied Energy Research](https://www.youtube.com/watch?v=V3jfECTjMS8)\
[CTCN - IGCC Efficiency & More](https://www.ctc-n.org/technology-library/production-efficiency/integrated-gasification-combined-cycle)\
[IECM 2019 - IGCC Technical Documentation](https://www.uwyo.edu/iecm/_bfiles/documentation/201903_iecmtd_igcc-rev-a.pdf)\
[NETL - IGCC Configuration](https://www.netl.doe.gov/research/coal/energy-systems/gasification/gasifipedia/igcc-config)\
[NETL - IGCC Efficiency / Performance](https://www.netl.doe.gov/research/Coal/energy-systems/gasification/gasifipedia/igcc-efficiency)\
[IGCC Capacity Factor Study by Jaeger](https://www.researchgate.net/publication/294297933_Refinery_IGCC_plants_are_exceeding_90_capacity_factor_after_3_years)\
[Mitsubishi IGCC Features](https://power.mhi.com/products/igcc)\
[OSTI IGCC Capacity Factor](https://www.osti.gov/biblio/20752268)\
[EIA 2022 - Coal Plant Retirements](https://www.eia.gov/todayinenergy/detail.php?id=54559)\
[Global Energy Monitor 2024 - Global Coal Outlook](https://globalenergymonitor.org/report/boom-and-bust-coal-2024/)\
[Carbon Brief 2024 - Global Coal Outlook](https://www.carbonbrief.org/guest-post-just-15-countries-account-for-98-of-new-coal-power-development/)\
[E3G 2024 - Global Coal Outlook](https://www.e3g.org/publications/boom-and-bust-2024-tracking-the-global-coal-plant-pipeline/)\
[MIT 2024 - CCS Energy Requirements](https://climate.mit.edu/ask-mit/if-fossil-fuel-power-plant-uses-carbon-capture-and-storage-what-percent-energy-it-makes)\
[EIA 2022 - Coal Use by Industry](https://www.eia.gov/energyexplained/coal/use-of-coal.php)\
[EPA FGD Fact Sheet](https://www3.epa.gov/ttncatc1/dir1/ffdg.pdf)\
[EPA SCR Fact Sheet](https://www3.epa.gov/ttncatc1/dir1/fscr.pdf)

## Natural Gas

	Natural gas forms over millions of years from the decomposition of ancient marine organisms, such as plankton and algae, that settled on the seafloor in low-oxygen environments. Buried under layers of sediment, these organic materials underwent catagenesis, a transformation under intense heat and pressure that breaks down complex organic molecules into hydrocarbons, primarily methane—the main component of natural gas.

	Found in porous rock formations like sandstone or limestone and trapped in shale formations, natural gas is extracted using vertical or horizontal drilling methods, often enhanced by hydraulic fracturing (fracking) in tight rock formations. Advancements in fracking technology have significantly increased access to natural gas reserves. Natural gas usually flows to the surface naturally due to reservoir pressure. The well is fitted with Christmas tree valves (specialized wellheads) to control gas flow. Once pressure is too low, compressors are required. Once extracted, the raw gas is processed to remove impurities such as water vapor, carbon dioxide, and hydrogen sulfide, leaving primarily methane. It is then transported through an extensive network of pipelines to the plant where on-site storage tanks or underground facilities provide a buffer against supply disruptions.

__Natural Gas Composition:__

- Methane (CH₄): >85%
- Ethane (C₂H₆): 3–8%
- Propane (C₃H₈): 1–2%
- Butane (C₄H₁₀): \<1%
- Pentane (C₅H₁₂): \<1%
- Carbon Dioxide (CO₂): 1–2%
- Hydrogen Sulfide (H₂S): \<1%
- Nitrogen (N₂): 1–5%
- Helium (He): \<0.5%

__Natural Gas Heat Value:__

- LHV: \~900–1,000 Btu/ft³
- HHV: \~1,000–1,100 Btu/ft³

### Conventional Natural Gas Combustion Turbine

	Conventional natural gas combustion turbines are a widely used technology for generating electricity quickly and efficiently. In these plants, natural gas is burned in a combustion chamber, producing high-temperature, high-pressure gas that rapidly expands and flows through a turbine which drives a generator to produce electricity. This simple-cycle design allows for rapid startup and shutdown, making it highly responsive to fluctuating energy demands. Although less efficient than combined-cycle systems, they play a crucial role in meeting peak power needs and providing grid stability.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Brayton |
| Peak Temperature | 1,093-1,427°C (2,000-2,600°F) |
| Minimum Temperature | Ambient temperature (open cycle) |
| Power Capacity | 30-400 MW |
| Capacity Factor | 10-30% |
| Cycle Efficiency | 30-40% |
| Heat Rate | 8,000-11,000 Btu/kWh |
| Emission Rates | __Without controls (lbs/MWh):__<br>• CO₂: \~1,100–1,200<br>• NOₓ: \~0.6–1.0<br>• CO: \~0.3–0.5<br>• Particulates: \~0.02–0.03<br>__With controls (lbs/MWh):__<br>• CO₂: \~1,100–1,200 (CCS not typically applied)<br>• NOₓ: \~0.1–0.2<br>• CO: \~0.1–0.2<br>• Particulates: \~0.005–0.01 |
| Capital Cost | \$600-1,100/kW |
| Fixed O&M Costs | \$6-20/kW-year |
| Variable O&M Costs | \$3-5/MWh |
| Expected Operational Life | 20-30 years |

### Advanced Natural Gas Combustion Turbine

	Advanced natural gas combustion turbines represent an evolution of conventional gas turbine technology, designed to achieve higher efficiency, greater power output, and reduced emissions. Like conventional turbines, they operate by burning natural gas in a combustion chamber to produce high-temperature, high-pressure gas. This gas expands and flows through a turbine, driving a generator to produce electricity. However, advanced turbines incorporate innovations in materials, cooling techniques, and aerodynamics, enabling them to reach higher temperatures and efficiencies. These improvements make advanced turbines suitable for both peak and intermediate power needs, offering a flexible and more environmentally friendly option for meeting dynamic energy demands while supporting grid stability.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Brayton |
| Peak Temperature | 1,370-1,816°C (2,500-3,300°F) |
| Minimum Temperature | Ambient temperature (open cycle) |
| Power Capacity | 200-400 MW |
| Capacity Factor | 15-40% |
| Cycle Efficiency | 40-45% |
| Heat Rate | 8,500-9,500 Btu/kWh |
| Emission Rates | __Without controls (lbs/MWh):__<br>• CO₂: 1,050–1,150<br>• NOₓ: \~0.4–0.8<br>• CO: \~0.2–0.4<br>• Particulates: \~0.01–0.02<br>__With controls (lbs/MWh):__<br>• CO₂: \~1,050–1,150 (CCS not typically applied)<br>• NOₓ: \~0.05–0.1br>\*CO: \~0.05–0.1<br>• Particulates: \~0.003–0.008 |
| Capital Cost | \$900-1,300/kW |
| Fixed O&M Costs | \$8-22/kW-year |
| Variable O&M Costs | \$4-6MWh |
| Expected Operational Life | 20-30 years |

### Conventional Natural Gas Combined Cycle

	Conventional natural gas combined cycle (NGCC) plants combine a gas turbine with a steam turbine to maximize energy extraction from natural gas. In the gas turbine, natural gas is burned to produce high-temperature exhaust gases, which drive the turbine and generate electricity. Rather than venting this exhaust, it’s directed to a heat recovery steam generator (HRSG) that produces steam to power a secondary steam turbine, generating additional electricity. This combined cycle design significantly improves efficiency compared to simple-cycle plants, making NGCC plants ideal for base-load and intermediate power generation. Conventional NGCC plants provide stable power generation with relatively low emissions and fuel costs, supporting grid demands with high operational efficiency.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Brayton + Rankine |
| Peak Temperature | 1,300-1,450°C (2,372-2,642°F) |
| Condenser Temperature | 30-40°C (86-104°F) |
| Condenser Cooling Rate | 7,000 -10,000 Btu/kWh |
| Power Capacity | 50-500 MW |
| Capacity Factor | 55-65% |
| Cycle Efficiency | 50-60% |
| Heat Rate | 6,500-7,500 Btu/kWh |
| Emission Rates | __Without controls (lbs/MWh):__<br>• CO₂: 800–900<br>• NOₓ: \~0.4-0.7<br>• CO: \~0.2–0.4<br>• Particulates: \~0.01–0.02<br>__With controls (lbs/MWh):__<br>• CO₂: \~1,050–1,150 (CCS not typically applied)<br>• NOₓ: \~0.05–0.1<br>• CO: \~0.05–0.1<br>• Particulates: \~0.005-0.01 |
| Capital Cost | \$1,000-1,200 per kW |
| Fixed O&M Costs | \$10-15 per kW-year |
| Variable O&M Costs | \$3-4 per MWh |
| Expected Operational Life | 25-40 years |

### Advanced Natural Gas Combined Cycle

	Advanced natural gas combined cycle (NGCC) plants represent a step forward in power generation technology, designed to achieve even higher efficiencies and lower emissions than conventional NGCC setups. Like conventional combined cycle plants, they use both a gas turbine (most commonly two gas turbines) and a steam turbine to maximize energy conversion from natural gas. Advanced NGCC plants incorporate state-of-the-art materials, higher turbine inlet temperatures, enhanced cooling systems, and optimized aerodynamics to reach efficiencies up to 65%! These improvements make advanced NGCC plants ideal for both base-load and peak demands, as they offer increased flexibility, quick ramp-up capabilities, and reduced environmental impact. By combining high efficiency with rapid response, advanced NGCC plants play a critical role in supporting a modern, responsive, and cleaner energy grid.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Brayton + Rankine |
| Peak Temperature | 1,500-1,600°C (2,372-2,642°F) |
| Condenser Temperature | 30-40°C (86-104°F) |
| Condenser Cooling Rate | 7,000 -10,000 Btu/kWh |
| Power Capacity | 500-1000 MW |
| Capacity Factor | 60-65% |
| Cycle Efficiency | 55-65% |
| Heat Rate | 5,500-6,500 Btu/kWh |
| Emission Rates | __Without controls (lbs/MWh):__<br>• CO₂: 750 - 900<br>• NOₓ: \~0.2 - 0.4<br>• CO: \~0.1–0.3<br>• Particulates: \~0.01–0.02<br>__With controls (lbs/MWh):__<br>• CO₂: \~70–180<br>• NOₓ: \~0.03–0.08br>\*CO: \~0.03–0.08<br>• Particulates: \~0.003-0.008 |
| Capital Cost | \$1,100-1,300 per kW |
| Fixed O&M Costs | \$12-18 per kW-year |
| Variable O&M Costs | \$3-4 per MWh |
| Expected Operational Life | 25-35 years |

### Analysis



#### Emission & Waste Treatment

	Natural gas is often touted as a cleaner alternative to coal due to its lower emissions profile and relatively simple waste management requirements. However, its environmental impact, particularly concerning CO2 emissions and methane leaks, is not negligible.

	Natural gas combustion emits 50-60% less CO₂ than coal per unit of electricity generated due to its higher hydrogen-to-carbon ratio, which results in a cleaner burn boasting the lowest per-MW CO2 production of fossil fuel resources. While the majority of methane is converted to CO2 when properly burned, methane leaks during extraction, processing, and transportation pose significant challenges; estimates suggest leakage rates of 1-3% of production, which could offset much of natural gas's CO₂ advantage. Addressing this issue requires comprehensive leak detection and repair (LDAR) programs, improved pipeline infrastructure, and stricter regulations.

	Fracking has also raised significant environmental challenges. The process involves injecting water, sand, and chemical additives into shale formations to release gas, with the resulting wastewater (produced water) often containing residual chemicals, heavy metals, and radioactive materials. This wastewater is typically injected into deep wells with negligible environmental effects in well-managed systems but can contaminate soil and groundwater through surface spills, mismanagement, or well failures, and has also been linked to induced seismic activity. Additionally, the large volumes of water required (1.5 - 16 million gallons per well) can strain local supplies.

	Carbon Capture and Storage (CCS) is more commonly used with natural gas than coal, as the cleaner flue gas from natural gas combustion simplifies the separation and capture of CO₂. Despite its potential, CCS is currently applied to only 1-2% of natural gas plants, largely due to its high costs and energy demands. Wider adoption of CCS could significantly reduce CO₂ emissions, particularly in combined-cycle gas plants, which are already among the most efficient fossil fuel-based power generation technologies. Nitrogen Oxides (NOₓ) remain a concern for natural gas due to its high-temperature combustion environment. However, Selective Catalytic Reduction (SCR) and Dry Low Emissions (DLE) or Dry Low NOₓ (DLN) systems represent viable mitigation strategies.

#### Environmental & Economic Influences

- __Proximity to Pipelines and LNG Infrastructure:__ Natural gas plants rely on access to pipeline networks or liquefied natural gas (LNG) terminals for fuel supply, which can restrict their placement to areas with established distribution systems.
- __Regional Market Pricing:__ Natural gas prices are influenced by regional supply-demand dynamics, export pressures, and storage capacity. Areas with abundant shale reserves or proximity to gas fields typically benefit from lower fuel costs, while regions dependent on LNG imports experience higher and more volatile prices due to shipping costs and global market fluctuations.
- __Integration with Renewable Energy:__ Natural gas plants, especially those using combined-cycle technology, are often co-located with renewable energy facilities. Their ability to ramp up and down quickly makes them an ideal partner for balancing intermittent energy sources like wind and solar. Conventional gas turbines start up quickly (\~10 min), while combined-cycle plants, though more efficient, take 30-60 minutes to reach full operation.
- __Land Use Requirements:__ Compared to coal or nuclear plants, natural gas facilities have a smaller physical footprint, which lowers site development costs and space occupied.

#### Current Trends & Future Outlook

	Natural gas continues to play a critical role in global energy systems due to its flexibility, moderate emissions profile, and its ability to support renewable energy integration. In the U.S., natural gas remains the largest source of electricity generation at 43%, accounting for approximately 36% of the nation’s energy consumption in 2023. Natural gas is a versatile energy source, with its usage spanning multiple sectors. It is primarily consumed for electric power generation which I’ve specified in this guide, accounting for 40% of total consumption. In the industrial sector accounting for 32% of natural gas use, it serves as both a high-temperature fuel for furnaces, kilns, and boilers, and as a critical feedstock for the production of chemicals, fertilizers, and hydrogen. Residential applications, comprising 14% of consumption, rely on natural gas for space heating, water heating, and cooking. Commercial operations use 10%, primarily for heating and powering appliances in schools, offices, and retail facilities. Finally, 4% of natural gas is used in transportation, where compressed natural gas (CNG) and LNG serve as cleaner-burning alternatives to gasoline and diesel for buses, trucks, and fleet vehicles. This dominance is driven by the abundance of domestic shale reserves, relatively low prices, and the desire for cleaner alternatives to coal.

	Globally, natural gas demand is expanding in regions transitioning away from coal. For example, China and India are increasing investments in natural gas infrastructure to diversify their energy mix and reduce reliance on coal, though growth is moderated by high LNG prices and limited domestic reserves. Europe continues to expand LNG import capacity, particularly in response to the reduction of Russian pipeline gas supplies, highlighting the geopolitical sensitivities surrounding natural gas. However, the increased use of LNG has driven up global prices, making natural gas less competitive in regions heavily reliant on imports.

	Despite its advantages, natural gas faces challenges as countries commit to decarbonization goals. Methane emissions during extraction and transportation, coupled with its role as a fossil fuel, have led to increasing scrutiny. In the face of climate policies, some regions are adopting carbon capture and storage (CCS) and exploring hydrogen production from natural gas (blue hydrogen) and natural gas fuel cells to reduce its carbon footprint. As the world shifts toward renewables, natural gas is increasingly seen as a transition fuel—essential for balancing intermittent renewable sources but likely to decline in prominence as storage technologies and green hydrogen mature.

### Conclusion

	Natural gas has emerged as a cleaner-burning, more flexible, and cheaper alternative to coal. Its reduced emissions, operational efficiency, and rapid startup and shutdown capabilities have cemented its role as a dominant energy source. However, its environmental impact, particularly methane leaks, carbon dioxide emissions, and continued reliance on fossil fuel infrastructure, underscores the challenges of balancing energy needs with climate goals.

__My opinion:__ Natural gas is pivotal in today’s energy transition, but its optimal role lies in supporting peak loads and mitigating intermittency in cleaner energy sources.

### References

[EIA 2021 - Natural Gas Carbon Emissions](https://www.eia.gov/todayinenergy/detail.php?id=48296)\
[EIA 2024 - Natural Gas Generating Capacity](https://www.eia.gov/todayinenergy/detail.php?id=61444)\
[USGS Fracking Water Requirements](https://www.usgs.gov/faqs/how-much-water-does-typical-hydraulically-fractured-well-require)\
[NREL 2013 - GHG Emissions from Conventional Natural Gas](https://www.nrel.gov/docs/fy13osti/57229.pdf)\
[EPA Gas Turbine Emissions](https://www.epa.gov/sites/default/files/2020-10/documents/c03s01.pdf)\
[Energy.gov Gas Turbine Overview](https://www.energy.gov/fecm/how-gas-turbine-power-plants-work)\
[IPIECA 2022 - Open Cycle Gas Turbines](https://www.ipieca.org/resources/energy-efficiency-compendium-online/open-cycle-gas-turbines-2022)\
[Northwest Power and Conservation Council 2013](https://www.nwcouncil.org/sites/default/files/Final_CCCT-Presentation_101613.pdf)\
[EIA 2017 - Natural Gas Heat Rate](https://www.eia.gov/todayinenergy/detail.php?id=32572)\
[EIA 2023 - Capital Costs and Performance](https://www.eia.gov/analysis/studies/powerplants/capitalcost/pdf/Capital_Cost_Study_Discussion_Slides.pdf)\
[NREL 2019 - Natural Gas Costs](https://atb-archive.nrel.gov/electricity/2019/index.html?t=cg)\
[APG Plant Lifecycle and Repair](https://alliedpg.com/latest-articles/economics-gas-turbine-repair-vs-replacement/)\
[METS 2015 - Combustion, Fuels and Emissions](https://turbolab.tamu.edu/wp-content/uploads/2018/08/Tutorial_1.pdf)\
[FPL 2016 - Depreciation Analysis](https://www.floridapsc.com/library/filings/2016/07554-2016/Support/OPCs%201st-38-Attachment%203.pdf)\
[DOE Advanced Brayton Cycles](https://www.netl.doe.gov/sites/default/files/gas-turbine-handbook/1-3-2.pdf)\
[CTCN - Advanced Gas Turbine Fact Sheet](https://www.ctc-n.org/sites/default/files/UNFCCC_docs/ref19x14_35.pdf)\
[EIA 2019 - Combined Cycle Cost and Capacity](https://www.eia.gov/todayinenergy/detail.php?id=39912)\
[EPA 2015 - Catalog of CHP Technologies](https://www.epa.gov/sites/default/files/2015-07/documents/catalog_of_chp_technologies_section_3._technology_characterization_-_combustion_turbines.pdf)\
[Design Features of Combined Cycle Systems](https://courses.washington.edu/mengr430/au07/handouts/comb_cycle.pdf)\
[Andover Technology 2018 - Improving Heat Rate on Combined Cycle](https://www.andovertechnology.com/wp-content/uploads/2021/03/C_18_EDF_FINAL.pdf)\
[EIA 2023 - Combined Cycle Heat Rates and Capacity Factors](https://www.eia.gov/todayinenergy/detail.php?id=60984)\
[EIA 2021 - Combined Cycle Capacity Factor](https://www.eia.gov/todayinenergy/detail.php?id=48036)\
[EIA 2022 - Combined Cycle Configurations](https://www.eia.gov/todayinenergy/detail.php?id=52158#)\
[Andover Technology 2023 - NOx and CO2 emissions](https://www.andovertechnology.com/wp-content/uploads/2023/09/CO2-and-NOx-from-NG-plants.pdf)\
[MDPI 2023 - Advanced Gas Turbine Cooling](https://www.mdpi.com/2504-186X/8/3/19)\
[DOE Advanced Combustion Turbine Efficiency and Temperature](https://netl.doe.gov/carbon-management/turbines/act)\
[IEEE 2021 - Combined Cycle Optimization](https://ieeexplore.ieee.org/document/9570103)\
[ScienceDirect - Combined Cycle](https://www.sciencedirect.com/topics/engineering/natural-gas-combined-cycle)\
[Woodway Energy 2024 - Natural Gas Analysis](https://www.woodwayenergy.com/natural-gas-efficiency-in-power-generation/)\
[EIA 2023 - Natural Gas Use by Industry](https://www.eia.gov/energyexplained/natural-gas/use-of-natural-gas.php)\
[EIA 2024 - How Much Natural Gas is Left?](https://www.eia.gov/energyexplained/natural-gas/how-much-gas-is-left.php)

## Petroleum

	Petroleum, commonly known as crude oil, is a naturally occurring liquid mixture of hydrocarbons that forms over millions of years from catagenesis. This same process also produces natural gas, which typically forms at higher temperatures and greater depths than oil. While petroleum is composed mainly of long-chain hydrocarbons like octane (C₈H₁₈), small amounts of these lighter hydrocarbons are often dissolved within it. This overlap underscores the close relationship between these two fossil fuels, which frequently coexist in the same reservoirs.

	Petroleum is categorized based on two key properties: density and sulfur content, leading to classifications such as light/heavy (density) and sweet/sour (sulfur content). Light, sweet crude, rich in shorter hydrocarbons and low in sulfur, is highly valued for its ease of refining into fuels like gasoline. In contrast, heavy, sour crude contains longer hydrocarbon chains and higher sulfur levels, requiring more intensive refining processes but yielding valuable products like diesel and lubricants. Regardless of its type, petroleum is extracted using vertical or directional drilling techniques. In many conventional wells, natural pressure drives oil to the surface, but as pressure declines, artificial lift methods such as pump jacks are used to bring the oil up. Secondary or tertiary recovery methods, including water flooding, gas injection, or steam-assisted extraction, may also be employed to enhance recovery. Once brought to the surface, crude oil undergoes a complex refining process to separate and convert its components into a wide array of products essential for modern life.

	The refining process begins with fractional distillation, where crude oil is heated, and its components are separated based on their boiling points. Lighter fractions, such as gasoline and propane, vaporize and rise to the top of the distillation column, while heavier fractions like diesel and residual oils settle at the bottom. Subsequent processes, including cracking (breaking down longer hydrocarbon chains into shorter ones) and treating (removing impurities like sulfur and nitrogen), further refine these fractions into high-value fuels and chemicals. Once refined, petroleum products are transported to distribution centers via pipelines, rail, or tanker trucks. For areas far from refineries, shipping plays a key role in delivering products like jet fuel and gasoline. Storage tanks at terminals and retail stations maintain a steady supply, buffering against demand fluctuations or supply chain disruptions.

	Petroleum’s versatility stems from the diversity of its refined products, each tailored to specific applications. Hydrocarbon gas liquids (HGLs) like propane (C3H8) and butane (C4H10) are among the lightest products, making them ideal for residential heating and cooking. Gasoline, composed of hydrocarbons from pentane (C4H10) to dodecane (C12H26), fuels vehicles with its high energy density and combustibility. Kerosene, including jet fuel, falls into the mid-range (C10H22 - C14H30) and powers aviation with its high energy content and stability under extreme conditions. Diesel fuel and heating oil, derived from longer hydrocarbons like pentadecane (C15H32) to octadecane (C18H38), provide stability and efficiency for transportation and heating systems. Finally, heavier petroleum products such as lubricating oils and petrolatum are composed of even longer hydrocarbon chains.

__Heat Value:__

- Gasoline: \~123,500 Btu/Gal
- Kerosine: \~131,000 - 135,000 Btu/Gal
- Diesel: \~137,750 Btu/Gal

### Internal Combustion Engines (ICEs)

	ICEs are the cornerstone of petroleum usage, particularly in the transportation sector, which accounts for 70% of petroleum consumption in the U.S. in 2023. Unlike other fuels, petroleum's role in electric power generation is minimal (\<1%), making its primary application in vehicles the focus of this section contrary to the other fuels covered.

	Most gasoline engines rely on the Otto cycle, a repeating four-stroke thermodynamic process converting the chemical energy of fuel into mechanical work. The intake stroke allows a mixture of air and fuel to enter the cylinder. Next, the compression stroke compresses the air-fuel mixture, increasing its pressure and temperature to optimize combustion. In the power stroke, a spark plug ignites the compressed mixture, causing a rapid expansion of gases that generate the engine's mechanical power. Finally, the exhaust stroke expels exhaust gases preparing the cylinder for the next cycle. Diesel engines follow a similar cycle, with the key difference being compression ignition, where the heat generated by compression ignites the fuel, eliminating the need for spark plugs. ICEs are valued for their reliability, and ability to refuel quickly, making them indispensable for modern transportation systems.

__Key Technical Data:__

| **Parameter** | **Gasoline** | **Diesel** |
| --- | --- | --- |
| Cycle Type | Otto Cycle | Diesel Cycle |
| Peak Temperature | 2,000–2,500°F (1,093–1,371°C) | 2,200–2,700°F (1,204–1,482°C) |
| Power Capacity | 50–300 kW (67–402 hp) for passenger vehicles | 150–500 kW (201–670 hp) for heavy duty trucks; up to 80 MW for power generators, marine vessels, and heavy machinery |
| Cycle Efficiency | \~15-30% | \~25-45% |
| Heat Rate (Btu/kWh) | \~12,000–13,500 Btu/kWh | \~9,000–11,000 Btu/kWh |
| Emission Rates | • CO~2~: \~9.46 kg/gal (20.86 lb/ gal)<br>• NO~x~: \~1.63 (lb/MMBtu)<br>• CO: \~0.99 (lb/MMBtu)<br>• SO~2~: \~0.084 (lb/MMBtu) | • CO~2~: \~10.19 kg/gal (22.45 lb/gal)<br>• NO~x~: \~4.41 (lb/MMBtu)<br>• CO: 0.95 (lb/MMBtu)<br>• SO~2~: 0.29(lb/MMBtu) |
| Capital Cost | \~\$50–100/kW | \~\$600-1,200/kW (for a plant) |
| Fixed O&M Costs | \~\$20–30/kW-year | \~\$36.81/kW-year |
| Variable O&M Costs | \~\$10–15/MWh | \~\$5.96/MWh |
| Expected Operational Life | 10–20 years or \~300,000 miles (passenger cars) | 15–25 years |

### Analysis



#### Emission & Waste Treatment

	The combustion of petroleum generates a range of pollutants including CO₂, CO, NOₓ, PM, and volatile organic compounds (VOCs). To mitigate these impacts, regulatory standards like the U.S. Clean Air Act have driven the development and implementation of advanced technologies and fuel modifications. One critical innovation is the catalytic converter, a device installed in vehicle exhaust systems that uses precious metals like platinum, palladium, and rhodium as catalysts. These catalysts facilitate chemical reactions that transform harmful pollutants into less damaging substances such as oxidizing CO into CO₂, unburned hydrocarbons (HCs) into H₂O and CO₂, and reducing NOₓ into N₂ and O₂. Additionally, fuel formulations have been improved; for instance, low-sulfur fuels significantly reduce SOₓ emissions, and oxygenated additives like ethanol help lower CO emissions by promoting more complete combustion.

	Beyond emissions, petroleum refining generates waste that presents significant disposal challenges. Heavy hydrocarbons, often referred to as residual oil or “bottoms,” can be used for lower-grade applications like bunker fuel for ships but are extremely dirty and unsuitable for most transportation or energy uses due to their high sulfur and impurity content. Spent catalysts, which help refine oil by facilitating chemical reactions, become hazardous waste due to the metals they contain (e.g., vanadium, nickel). These are often recycled to recover valuable metals or disposed of in regulated facilities. Oily sludge, a byproduct of tank cleaning and refining, is either incinerated or treated and stabilized before being sent to landfills. Petroleum coke is sold cheaply as an industrial fuel source similar to coal but with much higher sulfur levels. While advances in waste treatment technologies have allowed for greater recycling and reuse, some refining waste remains unavoidably destined for safe disposal.

	Oil spills are one of the most visible forms of petroleum waste. They have severe and long-lasting environmental consequences and happen thousands of times a year in the U.S. during ship refueling, drilling operations, or pipeline breaks. High-profile disasters like the Deepwater Horizon spill highlights the scale of damage that can occur. Mitigation strategies for spills include preventive measures like double-hulled tankers, which reduce the likelihood of leaks, and advanced leak detection systems. Once a spill occurs, response efforts focus on containment (e.g., booms and barriers), recovery (e.g., skimmers and vacuums), and chemical dispersants to break down the oil. However, these methods have limitations, and the environmental and economic recovery from large spills often takes years or decades.

#### Economic and Environmental Influences

	Crude oil extraction methods vary widely in cost; for instance, light, sweet crude from accessible fields is cheaper to produce than heavy, sour crude or oil extracted from deep-water reserves or tar sands. Geopolitical tensions, such as conflicts in major oil-producing regions or trade sanctions, can also disrupt supply chains and spike prices.

#### Current Trends & Future Outlook

	Petroleum continues to dominate the transportation sector, powering nearly all ICE vehicles worldwide. Despite its dominance, the growing adoption of electric vehicles (EVs) in developed countries is gradually reducing petroleum demand in some markets. However, petroleum remains indispensable in sectors like aviation, shipping, and heavy-duty transport, where alternatives to liquid fuels are either technologically or economically unviable. The primary hurdle to fully transitioning away from petroleum is the lack of advanced, scalable electricity storage solutions capable of supporting these high-energy-demand sectors.

	As of 2023, the United States led global oil production at approximately 22 million barrels per day (22%), followed by Saudi Arabia and Russia, each producing around 11 million barrels per day (11%). On the consumption side, the U.S. accounted for 20% of global oil use, with China close behind at 15%. Several nations, particularly in Europe, have announced ambitious plans to phase out or reduce petroleum use. Countries like Norway, which already has over 80% of new vehicle sales coming from EVs, aim to ban the sale of new ICE vehicles by 2025. Similarly, the European Union is targeting a 2035 phase-out of fossil fuel-powered cars. Meanwhile, in developing countries like India and parts of Southeast Asia, petroleum demand is expected to rise as industrialization and vehicle ownership increase, with major oil-producing nations like Saudi Arabia and Russia more than happy to maximize production to secure global market share. The United States represents a mixed approach, with significant investments in EVs and renewable energy while maintaining robust petroleum production to meet domestic and export demands.

### Conclusion

	Petroleum remains indispensable to global energy, particularly in the transportation sector, where its unmatched energy density and adaptability have few viable competitors. Its refined products fuel industries and applications where current renewable technologies struggle to compete. However, the environmental and geopolitical challenges associated with petroleum use underscore the urgent need to transition toward cleaner alternatives.

__My opinion:__ Petroleum will remain a critical energy source until a cleaner alternative with comparable fluidity, energy density, and scalability is discovered. In the meantime, implementing robust environmental regulations and accelerating research into alternatives such as biofuels, hydrogen, ammonia, synthetic fuels, and advanced batteries offer the most pragmatic path forward.

### References

[EIA 2022 - Oil and Petroleum Products Explained](https://www.eia.gov/energyexplained/oil-and-petroleum-products/use-of-oil.php)\
[American Chemical Society 2005 - Gasoline Information](https://pubsapp.acs.org/cen/whatstuff/stuff/8308gasoline.html)\
[URE Fuel Heating Values](https://c03.apogee.net/mvc/home/hes/land/el?utilityname=ure&spc=pq&id=19024)\
[MIT OpenCourseWare - Internal Combustion Engines](https://www.ocw.mit.edu/courses/2-61-internal-combustion-engines-spring-2017/resources/lecture-notes/)\
[CED Engineering - Principles of an Internal Combustion Engine](https://www.cedengineering.com/userfiles/Principles%20of%20an%20Internal%20Combustion%20Engine-R4.pdf)\
[EPA - Gasoline and Diesel Industrial Engines](https://www3.epa.gov/ttnchie1/ap42/ch03/final/c03s03.pdf)\
[Generator Source - Industrial Diesel Types and Applications](https://www.generatorsource.com/industrial_industry_usage.aspx)\
[EPA 2015 - Reciprocating Internal Combustion Engines](https://www.epa.gov/sites/default/files/2015-07/documents/catalog_of_chp_technologies_section_2._technology_characterization_-_reciprocating_internal_combustion_engines.pdf)\
[NOAA Oil Spills](https://www.noaa.gov/education/resource-collections/ocean-coasts/oil-spills)\
[EIA 2023 - Top Consumers and Producers of Oil](https://www.eia.gov/tools/faqs/faq.php?id=709&t=6)

## Nuclear

	Fissile materials are isotopes capable of sustaining a chain reaction by readily absorbing neutrons and undergoing fission, a process that releases vast amounts of energy. Among these, uranium-235 (U-235) is the most commonly used in commercial nuclear reactors. Natural uranium, however, is predominantly uranium-238 (U-238), a non-fissile isotope, with only 0.7% being fissile U-235. To make uranium usable as reactor fuel, it is enriched to increase the proportion of U-235 to 3-5% (compared to \~90% for a nuclear bomb) using techniques like centrifugation. This enrichment is essential for sustaining a chain reaction and ensuring the reliable operation of nuclear reactors.

	Neutrons play a key role in the nuclear chain reaction. At the start of the reaction, an external neutron source, such as californium-252 or alpha-neutron interactions with beryllium, introduces the first free neutrons. When a neutron is absorbed by a fissile material, it causes the nucleus to become unstable and split into smaller nuclei, releasing energy, additional neutrons, and radiation. Slowing neutrons down to "thermal speeds" (low energy) dramatically increases the likelihood of fission because slower neutrons are more easily captured by the nucleus. This is because the interaction between a neutron and a nucleus is governed by resonances—specific energy levels at which the nucleus is more likely to absorb the neutron. These resonances are much more common at low energies for fissile materials. For this reason, moderators like water or heavy water are used: they collide with neutrons, reducing their speed without absorbing them. Heavy water (deuterium oxide) is especially effective because it absorbs far fewer neutrons than regular water, enabling reactors to use natural uranium without the need for enrichment, as seen in Canada’s CANDU reactors.

	In addition to using U-235 as fuel, reactors often produce plutonium-239 (Pu-239), a fissile material formed when U-238 absorbs a neutron and undergoes beta decay. Pu-239 can sustain a chain reaction and plays a significant role in breeder reactors, which are designed to produce more fissile material than they consume. Breeder reactors utilize Pu-239 and thorium-232 (Th-232) to extend the fuel supply for nuclear power. Thorium, while not fissile itself, can absorb neutrons and convert to U-233, another fissile isotope. This opens the potential for thorium-based fuel cycles, which are more abundant, safer, and generate less long-lived radioactive waste than uranium-based cycles. Additionally, Pu-239 is used in MOX (Mixed Oxide) fuel, which combines uranium and plutonium oxides to recycle plutonium from spent fuel.

	Fuel rods, containing enriched UO2 or MOX pellets, are designed to sustain the fission process for extended periods, typically 3-7 years in a commercial reactor. Over time, the proportion of U-235 decreases, fission products accumulate, and reactor efficiency declines. At this point, the rods are replaced, and the spent fuel is stored in cooling pools or processed for recycling. The structure of fuel rods and assemblies is crucial to optimizing the fission process and heat removal. Fuel rods are encased in zirconium alloy for its high-temperature resistance and low neutron absorption. They are arranged in grid-like assemblies with precise spacing to allow coolant flow and neutron moderation. This moderation, combined with control rods and passive safety systems, ensure the reactor operates efficiently and safely while maximizing the use of its fuel. The development of thorium and breeder technologies further exemplifies the ongoing innovation in nuclear fuel cycles to meet future energy and environment demands.

__UO~2~​ Composition:__

- Oxygen (O): \~12%
- Uranium-238 (U-238): \~84%
- Uranium-235 (U-235): \~3-5%

__Fuel Heat Value:__

\*3.57x10^10^ Btu/lb

### Pressurized Water Nuclear Reactor

	Pressurized Water Reactors (PWRs) are the most widely used type of nuclear reactor for electricity generation, known for their robust safety design and efficient energy production. In a PWR, water is circulated through the reactor core under high pressure (\~15 MPa or 2,200 psi) to prevent it from boiling, even at temperatures exceeding 300°C (570°F). This heated water transfers its energy to a secondary loop via a heat exchanger (steam generator), where it converts water into steam to drive a turbine. Keeping the water in liquid form ensures a consistent and efficient heat transfer medium and by separating the radioactive primary loop from the turbine, PWRs minimize contamination risks.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Rankine |
| Peak Temperature | 300-330°C (moderator) |
| Condenser Temperature | • Water-Cooled: 20-30°C (68-86°F)<br>• Air-Cooled: 40-50°C (104-122°F) |
| Condenser Cooling Rate | 6,500-8,000 Btu/kWh |
| Power Capacity | 1,100-1,500 MW |
| Capacity Factor | 85-95% |
| Cycle Efficiency | 30-35% |
| Heat Rate | 10,000–11,500 Btu/kWh |
| Emission Rates | \~0 Direct Emissions |
| Capital Cost | \$4,000-7,000/kW |
| Fixed O&M Costs | \$100-140/kW-year |
| Variable O&M Costs | \~\$2/MWh |
| Expected Operational Life | 40 years with extensions up to 80 years |

### Boiling Water Nuclear Reactor

	Boiling Water Reactors (BWRs) are a widely used type of nuclear reactor known for their simplicity and direct approach to generating electricity. In a BWR, water flows through the reactor core, where it is heated by the energy released from nuclear fission. Unlike pressurized water reactors, the water in the core is allowed to boil, producing steam directly. This steam is then piped to drive a turbine connected to a generator, creating electricity. After passing through the turbine, the steam is condensed back into water and recirculated into the reactor. By using a single-loop system, BWRs eliminate the need for a separate heat exchanger (steam generator), simplifying the design and improving thermal efficiency. However, since the steam comes directly from the reactor, components like the turbine are exposed to low levels of radiation, requiring additional shielding and maintenance considerations. This straightforward and efficient design has made BWRs a cornerstone of nuclear power generation, second only to pressurized water reactors.

__Key Technical Data:__

| **Parameter** | **Value/Range** |
| --- | --- |
| Cycle Type | Rankine |
| Peak Temperature | \~285°C (550°F) |
| Condenser Temperature | 20-40°C (68-104°F) |
| Condenser Cooling Rate | 7,000−8,250 Btu/kWh |
| Power Capacity | 1,200-1,600 MW |
| Capacity Factor | 85-95% |
| Cycle Efficiency | 32-37% |
| Heat Rate | 10,000–11,500 Btu/kWh |
| Emission Rates | \~0 Direct Emissions |
| Capital Cost | \$3,000-6,000/kW |
| Fixed O&M Costs | \$100-200/kW-year |
| Variable O&M Costs | \$10-15/MWh |
| Expected Operational Life | 40 years with extensions up to 80 years |

### Analysis



#### Emission & Waste Treatment

	Nuclear radiation is the energy released from unstable atoms as they decay into more stable forms. This radiation can take the form of alpha particles, beta particles, or gamma rays, each with different levels of penetration and health risks. In the context of nuclear power, radiation originates from the fission process itself and from the radioactive decay of fission products. While radiation can be harmful at high levels, strict safety protocols in nuclear facilities ensure exposure is kept well below harmful limits.

	Spent nuclear fuel is composed of about 93% uranium (\~0.8% U-235), 5% fission products, 1.2% plutonium (primarily Pu-239), and 0.2% other transuranic elements (Np, Am, Cm). These rods are highly radioactive and generate significant heat due to the decay of the fission products and transuranic isotopes. Fission products such as cesium-137 and strontium-90 have relatively short half-lives (around 30 years), meaning they release intense radiation over decades, contributing to the heat and radioactivity immediately after removal from the reactor. Longer-lived isotopes, like Pu-239 (half-life \~24,100 years), remain radioactive for millennia but emit radiation at lower rates over time, though still dangerous. Initially, the spent fuel is stored in water-filled pools to cool and shield radiation. After cooling (typically 5-10 years), the rods are either moved to dry cask storage (steel and concrete containers) or sent for recycling, depending on the country. Long-term management strategies include deep geological repositories, designed to isolate waste for thousands of years. However, since most countries lack operational repositories, this waste often remains stored on-site while awaiting the development of permanent solutions.

	After 10 years of cooling, more than 99% of the radioactivity decays away. After 40 years, the radioactivity of used fuel decreases to about one-thousandth of its initial level upon reactor discharge. Within a period of 1,000 to 10,000 years, the radioactivity of high-level waste decays to levels comparable to the originally mined ore. The amount of spent nuclear fuel generated is relatively small compared to the energy produced. In the United States, if all electricity were generated from nuclear power, each person would produce approximately 34 grams of spent fuel annually. Over an average lifetime of 76.4 years, this amounts to about 2.6 kilograms (5.7 pounds) of spent fuel per person. Volumetrically, this is less than a 12-fluid-ounce soda can.

	Recycling spent nuclear fuel is a process aimed at recovering valuable materials, such as uranium and plutonium, while reducing the volume and radiotoxicity of high-level nuclear waste. Approximately 95% of a spent fuel rod can be recycled while the remaining highly radioactive fission products are placed in long-term storage. The most widely used method, the PUREX (Plutonium-Uranium Redox Extraction) process, involves dissolving the spent fuel in nitric acid. This separates uranium and plutonium from the fission products through chemical solvent extraction. The salvaged uranium is re-enriched and plutonium is combined with uranium oxide to produce MOX (Mixed Oxide) fuel, containing about 5-10% Pu and 90-95% UO2. MOX fuel is ideal for fast reactors, which operate without a moderator, because Pu has a higher fission probability with fast neutrons than U-235. Fast reactors also convert U-238 into more Pu-239, effectively breeding new fuel. They can also burn plutonium and other long-lived transuranic isotopes, significantly reducing the long-term radiotoxicity of nuclear waste. Despite its potential, the high cost, technical complexity, and concerns over nuclear proliferation from plutonium extraction have deterred countries like the United States from recycling nuclear waste, while nations such as France and Japan have led the way.

	One of the great benefits of nuclear power is that it produces no direct emissions during operation. However, like all mining, uranium extraction has environmental impacts, though its high energy density significantly reduces the amount needed. Moreover, uranium is relatively abundant—more common than silver or gold—ensuring a negligible risk of depletion.

#### Economic and Environmental Influences

	One of the most critical considerations for the location of a nuclear power plant is access to abundant cooling water, typically from nearby rivers, lakes, or oceans to regulate the reactor’s temperature. Additionally, geological stability is paramount; plants are situated in regions with minimal risk of earthquakes, tsunamis, or other natural disasters that could compromise the reactor's integrity. Proximity to population centers is also considered, with regulations often requiring plants to be located far enough away from urban areas to minimize risks in the unlikely event of a radiation release.

	The price of electricity generated by nuclear power depends on a few things, starting with the high upfront costs of building the plant. This is primarily due to the need of special materials, sophisticated safety features, and technical complexity leading to high R&D. That being said, these costs are typically offset by nuclear’s long operational lifespan. Operational and maintenance costs, including staffing and routine inspections, add to the expenses but are generally stable and predictable. The cost of uranium fuel is low due to its energy density, but enrichment, fabrication, and long-term waste management introduce additional expenses.

	Government subsidies, such as loan guarantees or production tax credits, can lower costs, while carbon pricing schemes may enhance nuclear’s competitiveness by penalizing fossil fuels for greenhouse gas emissions. However, nuclear power must also compete with rapidly advancing renewable technologies like wind and solar, which benefit from falling costs and shorter construction timelines. The regulatory environment also plays a significant role, as compliance with safety, environmental, and waste disposal regulations increases operational expenses.

#### Current Trends & Future Outlook

	The global approach to nuclear energy is evolving, with some countries aggressively expanding their programs while others scale back. China and India are leading the charge in nuclear growth, with China planning 36 new reactors and constructing 30, while India has 12 reactors planned and 7 under construction as of 2024. In contrast, nations like the United States, Germany, and Belgium are retreating from nuclear power, citing concerns over safety, waste management, and the high costs and lengthy timelines associated with building nuclear facilities. While the United States currently has the highest nuclear production in the world, generating nearly 10% of its power from nuclear fuel, the average age of its reactors is over 40 years with limited development in recent decades.

	Looking ahead, the development of Small Modular Reactors (SMRs) is a pivotal trend in nuclear energy. SMRs, with capacities under 300 MW, offer several advantages: lower upfront costs, enhanced safety features, and flexibility in deployment, with countries like the U.S., Canada, and the U.K. leading research. Fusion reactors, often called the "holy grail" of energy, are another frontier. While commercial fusion remains elusive, projects like ITER in France and private ventures aim to demonstrate net-positive energy fusion within the next decade. Fusion promises virtually limitless, clean energy without the long-lived waste of current fission reactors, though significant technical and economic hurdles remain. Thorium-based reactors represent another potential advancement. Thorium, which is 3-4 times more abundant than uranium, produces less long-lived radioactive waste and is inherently safer due to its lower risk of runaway reactions. India is at the forefront of thorium reactor development, leveraging its vast thorium reserves, with plans to integrate thorium into its nuclear fuel cycle over the coming decades. However, technical challenges, including the need for a fissile seed material like uranium-233, have slowed global adoption.

### Conclusion

	Nuclear energy remains a pivotal yet polarizing component of the global energy landscape. With its ability to deliver reliable, low-carbon power, it stands as a crucial tool in combating climate change. However, challenges such as public perception, high costs, and waste management continue to limit its broader adoption.

__My opinion:__ Nations should consider the implementation of existing nuclear technologies for baseload power while researching nuclear waste recycling, thorium reactor development, and nuclear fusion.

### References

[World Nuclear Association 2020 - Cooling](https://world-nuclear.org/information-library/current-and-future-generation/cooling-power-plants#)\
[Whatisnuclear.com](http://Whatisnuclear.com)\
[EIA Nuclear Fuel Cycle](https://www.eia.gov/energyexplained/nuclear/the-nuclear-fuel-cycle.php)\
[DOE 2022 - Spent Nuclear Fuel](https://www.energy.gov/ne/articles/5-fast-facts-about-spent-nuclear-fuel)\
[IPFM 2011 - Spent Nuclear Fuel](https://fissilematerials.org/library/ipfm-spent-fuel-overview-june-2011.pdf)\
[IAEA 2019 - Nuclear Fuel Lifecycle](https://www.iaea.org/sites/default/files/publications/magazines/bulletin/bull60-2/6020405.pdf)\
[NRC Introduction to Uranium Enrichment](https://www.nrc.gov/docs/ML1204/ML12045A049.pdf)\
[Thorium Reactor Video by Megaprojects](https://www.youtube.com/watch?v=jSFo_92cJ-U)\
[EIA 2021 - Nuclear Statistics](https://www.eia.gov/energyexplained/nuclear/data-and-statistics.php)\
[IAEA Nuclear for Net Zero Manual](https://www.iaea.org/sites/default/files/21/10/nuclear-energy-for-a-net-zero-world.pdf)\
[Various Videos on Nuclear by Illinois Professor David Ruzic](https://www.youtube.com/@illinoisenergyprof6878)\
[World Nuclear Association 2024 - Used Nuclear Fuel Recycling](https://world-nuclear.org/information-library/nuclear-fuel-cycle/fuel-recycling/processing-of-used-nuclear-fuel)\
[World Nuclear Association 2024 - Plans for New Reactors](https://world-nuclear.org/information-library/current-and-future-generation/plans-for-new-reactors-worldwide)\
[Energy Monitor 2023 - U.S. Nuclear Outlook](https://www.energymonitor.ai/sectors/power/why-a-new-era-for-us-nuclear-looks-unlikely/?cf-view)\
[Mitsubishi PWR Major Systems](https://www.mhi.com/products/energy/reactor_coolant_pump.html)\
[ScienceDirect 2019 - PWR Information](https://www.sciencedirect.com/topics/engineering/pressurized-water-reactor)\
[NRC PWR Concepts Manual](https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/04.pdf)\
[NRC PWR Westinghouse Technology Systems Manual](https://www.nrc.gov/docs/ml1122/ML11223A195.pdf)\
[NEI U.S. Plant Basic Information](https://www.nei.org/resources/statistics/us-nuclear-operating-plant-basic-information)\
[IAEA 2021 - Capacity Factor](https://www.iaea.org/newscenter/news/amid-global-crises-nuclear-power-provides-energy-security-with-increased-electricity-generation-in-2021)\
[World Nuclear Association 2024 - General Nuclear Power Information](https://world-nuclear.org/information-library/nuclear-fuel-cycle/nuclear-power-reactors/nuclear-power-reactors)\
[IAEA Nuclear Capital Costs](https://www.iaea.org/sites/default/files/publications/magazines/bulletin/bull20-1/20104781123.pdf)\
[NEI 2023 - Nuclear Costs in Context](https://www.nei.org/CorporateSite/media/filefolder/resources/reports-and-briefs/2023-Costs-in-Context_r1.pdf)\
[IES 2023 - Advanced Reactor Costs](https://inldigitallibrary.inl.gov/sites/sti/sti/Sort_66425.pdf)\
[Nuclear Energy Cost Estimates for Net Zero World Initiative 2024](https://inldigitallibrary.inl.gov/sites/sti/sti/Sort_67418.pdf)\
[ScienceDirect 2018 - BWR Information](https://www.sciencedirect.com/topics/engineering/boiling-water-reactor)\
[NRC BWR Concepts Manual](https://www.nrc.gov/docs/ml1209/ML120970422.pdf)\
[General Electric BWR Fact Sheet and General Description](https://www.gevernova.com/nuclear/carbon-free-power/large-reactors)\
[NRC Operating U.S. Nuclear Reactors](https://www.nrc.gov/info-finder/reactors/index.html)\
[Nuclear Waste Video by DW Planet A](https://www.youtube.com/watch?v=hiAsmUjSmdI)\
[What Happened to Nuclear Energy Video by Johnny Harris](https://www.youtube.com/watch?v=QzTgZ6kOEM8)

## General Resources & References

[EPA Data Explorer](https://www.epa.gov/egrid/data-explorer)\
[EIA 2023 - Electricity Generation by Source](https://www.eia.gov/tools/faqs/faq.php?id=427&t=3)\
[EIA 2023 - Primary Energy Consumption by Source](https://www.eia.gov/energyexplained/us-energy-facts/)\
[IEA 2020 - World Energy Balances](https://www.iea.org/reports/world-energy-balances-overview/world)\
[Our World in Data 2024 - Energy Mix](https://ourworldindata.org/energy-mix)\
[IPCC 2014 - Cost and Performance Parameters](https://www.ipcc.ch/site/assets/uploads/2018/02/ipcc_wg3_ar5_annex-iii.pdf)\
[EIA 2022 - Performance Characteristics of New Generating Technologies](https://www.eia.gov/outlooks/aeo/assumptions/pdf/table_8.2.pdf)\
[EIA 2023 - Emissions by Plant and Region](https://www.eia.gov/electricity/data/emissions/)\
[IEA 2022 - China Energy Mix](https://www.iea.org/countries/china)\
[EIA 2022 - Cost and Performance Characteristics](https://www.eia.gov/outlooks/aeo/assumptions/pdf/table_8.2.pdf)\
[EIA 2023 - Heat Rates for Selected Energy Sources](https://www.eia.gov/electricity/annual/html/epa_08_01.html)\
[Lazard 2023 - Levelized Cost](https://www.lazard.com/media/2ozoovyg/lazards-lcoeplus-april-2023.pdf)\
[EIA 2024 - Carbon Dioxide Emissions by Fuel](https://www.eia.gov/environment/emissions/co2_vol_mass.php)
